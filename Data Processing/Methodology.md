# Data Methodology

### Notes

- Occupation titles are not consistent between data sets. I did not attempt to merge them to retain the accuracy of the data. It does mean that the occupations presented are kinda whack lmao.
- The numbers are presented as annual wages which can be a bit misleading for hourly / part-time workers whose wages are heavily dependent on hours worked.

### UK: United Kingdom

Pulled from **Earnings and hours worked, occupation by four-digit SOC: ASHE Table 14** via UK Government’s Office for National Statistics found here: 

You can access the data sets and read about the methodology and limitations here: [https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/occupation4digitsoc2010ashetable14](https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/occupation4digitsoc2010ashetable14)

**First note that 2021 data is not revised and may be amended in the future.**

Utilized table 14.7a which covers gross annual income across occupations. **Notably, it does not include incentives.**

From this table, the following columns were selected: Description, Median, and Mean. **Notably, although all data included is considered acceptable, nuance around the confidence behind the data is lost.** 

This data was then selected to the most frequent granularity of occupation, and included as long as a median OR mean value was available.

**Finally, note that I didn’t check if the data was regularly updated to be in current dollars. In all likelihood, it does not and will need to be amended to account for inflation to improve the meaningfulness of raise data.**

This data was then formatted into a JSON with the following formatting:

```
{
        'jobA': {
            'year_1': {
                'median': 0000000,
                'mean': 0000000
            }
            ...
            'year_5': {
                'median': 0000000,
                'mean': 0000000
            }
        },
        
        ...
        
        'jobZ': {
            'year_1': {
                'median': 0000000,
                'mean': 0000000
            }
            ...
            'year_5': {
                'median': 0000000,
                'mean': 0000000
            }
        },
}
```

### CAN: Canada

Pulled from the **Employee wages by occupation, annual** released on 2022-01-07 via Statistics Canada.

You can access the data sets and read about the methodology and limitations here: [https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410034001](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410034001)

**First note that the data is based in weekly wages in current Canadian dollars as of 2022** (that is, inflation is accounted for)

**The annual wage was extrapolated by multiplying by 52 (number of weeks in the year).** 

Assumed average refers to mean and stores average data as mean to retain consistency with other data sets. 

This data was then formatted into a JSON with the following formatting:

```
{
        'jobA': {
            'year_1': {
                'median': 0000000,
                'mean': 0000000
            }
            ...
            'year_5': {
                'median': 0000000,
                'mean': 0000000
            }
        },
        
        ...
        
        'jobZ': {
            'year_1': {
                'median': 0000000,
                'mean': 0000000
            }
            ...
            'year_5': {
                'median': 0000000,
                'mean': 0000000
            }
        },
}
```

### US: United States of America

Pulled from **Occupational Employment and Wage Statistics** via US Bureau of Labour Statistics.

You can access the data sets and read about the methodology and limitations here: [https://www.bls.gov/oes/tables.htm](https://www.bls.gov/oes/tables.htm)

Utilized the National XLS data sets for 2017-2021 and converted the first sheet (when applicable) to CSV. 

After importing datasets to python as pandas dataframes, I filtered jobs to the most granular specificity available according to SOC grouping (under `OCC_GROUP` or `O_GROUP`) and dropped all broad categories. 

I used `A_MEDIAN` for the annual median wage and `A_MEAN` for the annual mean wage. I used `OCC_TITLE` for the job description.

I stored those selections across all the years into a JSON object with the following formatting

```
{
        'jobA': {
            'year_1': {
                'median': 0000000,
                'mean': 0000000
            }
            ...
            'year_5': {
                'median': 0000000,
                'mean': 0000000
            }
        },
        
        ...
        
        'jobZ': {
            'year_1': {
                'median': 0000000,
                'mean': 0000000
            }
            ...
            'year_5': {
                'median': 0000000,
                'mean': 0000000
            }
        },
}
```