
    // --- JS Logic for selection and summary ---
    function getParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            start: params.get('start'),
            startTime: params.get('startTime'),
            end: params.get('end'),
            endTime: params.get('endTime'),
            car: params.get('car'),
            price: parseFloat(params.get('price'))
        };
    }
    function calcDays(start, end) {
        const s = new Date(start);
        const e = new Date(end);
        return Math.max(1, Math.ceil((e-s)/(1000*60*60*24)));
    }
    // Risk pricing (EUR/day)
    const riskPrices = {
        basic: 0,
        premium: 7
    };
    let selectedRisk = 'premium';
    let selectedEquip = [];
    // Card selection logic
    document.querySelectorAll('.risk-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.risk-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedRisk = card.getAttribute('data-risk');
            updateSummary();
        });
    });
    document.querySelectorAll('.btn-select').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            btn.closest('.risk-card').click();
        });
    });
    document.querySelectorAll('.equip-card input[type="checkbox"]').forEach(chk => {
        chk.addEventListener('change', function() {
            selectedEquip = Array.from(document.querySelectorAll('.equip-card input[type="checkbox"]:checked')).map(c => c.value);
            updateSummary();
        });
    });
    // Set default selected risk
    document.querySelector('.risk-card[data-risk="premium"]').classList.add('selected');
    // Update summary
    const state = getParams();
    function updateSummary() {
        const days = calcDays(state.start, state.end);
        const riskCost = riskPrices[selectedRisk] * days;
        const equipCost = selectedEquip.length * 2 * days;
        
        // Convert RON price to EUR (car prices from reservation page are in RON)
        const eurRate = 0.20; // 1 RON = 0.20 EUR (approximate)
        const baseRon = isNaN(state.price) ? 0 : state.price * days;
        const base = baseRon * eurRate;
        
        const total = Math.round((base + riskCost + equipCost)*100)/100;
        document.getElementById('totalCost').textContent = total + ' EUR';
        
        // Create detailed summary text
        let summaryText = 'Reservation summary';
        if (state.car) {
            summaryText += `<br><strong>${escapeHTML(state.car)}</strong>`;
        }
        if (state.start && state.end) {
            const startDate = escapeHTML(new Date(state.start).toLocaleDateString('en-US'));
            const endDate = escapeHTML(new Date(state.end).toLocaleDateString('en-US'));
            summaryText += `<br>${startDate} - ${endDate} (${days} days)`;
        }
        if (base > 0) {
            summaryText += `<br>Car: ${Math.round(base*100)/100} EUR`;
        }
        if (riskCost > 0) {
            summaryText += `<br>Insurance: ${Math.round(riskCost*100)/100} EUR`;
        }
        if (equipCost > 0) {
            summaryText += `<br>Equipment: ${Math.round(equipCost*100)/100} EUR`;
        }
        
        document.getElementById('summaryText').innerHTML = summaryText;
    }
    updateSummary();
    document.getElementById('prevBtn').onclick = function() {
        const params = new URLSearchParams(window.location.search);
        window.location.href = 'reservation.html?' + params.toString();
    };
    document.getElementById('nextBtn').onclick = function() {
        alert('Your reservation: ' + JSON.stringify({ ...state, risk: selectedRisk, equip: selectedEquip }) + '\nTotal cost: ' + document.getElementById('totalCost').textContent);
    };
    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
