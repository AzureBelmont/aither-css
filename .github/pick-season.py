"""Choose which theme season.css should be a copy of today.

Holidays win over the base season, and only for their window.
Prints  theme=<name>  for the workflow to read.
"""
import datetime

d  = datetime.date.today()
md = (d.month, d.day)

HOLIDAYS = [
    ((10, 24), (11,  1), 'halloween'),
    ((12, 15), (12, 26), 'yule'),
    (( 2, 10), ( 2, 15), 'valentine'),
]
SEASONS = {
    (12,  1,  2): 'winter',
    ( 3,  4,  5): 'spring',
    ( 6,  7,  8): 'summer',
    ( 9, 10, 11): 'harvest',
}

theme = None
for start, end, name in HOLIDAYS:
    if start <= md <= end:
        theme = name
        break

if theme is None:
    for months, name in SEASONS.items():
        if d.month in months:
            theme = name
            break

print('theme=' + theme)
