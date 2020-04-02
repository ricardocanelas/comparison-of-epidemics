import { Line, ResponsiveLine } from '@nivo/line'

// https://nivo.rocks/storybook/?path=/story/line--custom-line-style
// https://github.com/plouc/nivo/blob/master/packages/line/stories/line.stories.js

const Chart = ({ data }) => {

  const commonProperties = {
    width: 700,
    height: 500,
    margin: { top: 40, right: 100, bottom: 50, left: 100 },
    data,
    animate: false,
    enableSlices: 'x',
    enablePoints: false,
    enableGridY: true,
    enableGridX: false,
  }

  return (
    <Line
      {...commonProperties}
      colors={{ scheme: 'dark2' }}
      xScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
      }}
      yScale={{
        type: 'linear',
        stacked: false,
      }}
      curve='natural'
      axisBottom={{
        legend: 'days',
        legendOffset: 40,
      }}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}

export default Chart