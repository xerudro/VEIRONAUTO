import pandas as pd
import re

df = pd.read_excel('docs/Grila tarife - site.xlsx')

def euro_to_ron(val):
    m = re.match(r'(\\d+)', str(val))
    return str(round(int(m.group(1)) * 5.07)) + ' RON' if m else ''

df2 = pd.DataFrame()
df2['Model'] = df.iloc[1:20, 0]
for i, col in enumerate(['1 - 3 zile', '4 - 7 zile', '8 - 14 zile', '15 - 30 zile']):
    df2[col + ' (EUR)'] = df.iloc[1:20, i + 1]
    df2[col + ' (RON)'] = df.iloc[1:20, i + 1].apply(euro_to_ron)
df2['Garanție (EUR)'] = df.iloc[1:20, 5]
df2['Asigurare Premium'] = df.iloc[1:20, 6]
df2['Asigurare Integrală'] = df.iloc[1:20, 7]

import sys
sys.stdout.buffer.write(df2.to_markdown(index=False).encode('utf-8'))