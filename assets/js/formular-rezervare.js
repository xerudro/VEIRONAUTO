    document.addEventListener('DOMContentLoaded', function() {
      var bookingForm = document.getElementById('bookingForm');
      if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
          e.preventDefault();
          // Get values
          var pickupDate = document.getElementById('pickupDate')?.value;
          var pickupTime = document.getElementById('pickupTime')?.value;
          var dropoffDate = document.getElementById('dropoffDate')?.value;
          var dropoffTime = document.getElementById('dropoffTime')?.value;
          // Build query string
          var params = new URLSearchParams();
          if (pickupDate) params.append('start', pickupDate);
          if (pickupTime) params.append('startTime', pickupTime);
          if (dropoffDate) params.append('end', dropoffDate);
          if (dropoffTime) params.append('endTime', dropoffTime);
          // Redirect
          window.location.href = 'rezervare.html?' + params.toString();
        });
      }
    });
 