import { ResponsiveMarimekko } from '@nivo/marimekko'

export const AdminChart = () => {
  return (
    <div className="p-3 h-30rem admin-chart-width shadow-1 border-1 border-gray-200 border-round-md">
      <h2 className="m-0">Encuesta de satisfacción</h2>
      <ResponsiveMarimekko
        data={[
          {
            "statement": "Es fácil de manejar",
            "participation": 20,
            "stronglyAgree": 4,
            "agree": 11,
            "disagree": 30,
            "stronglyDisagree": 28
          },
          {
            "statement": "Es fácil de entender",
            "participation": 20,
            "stronglyAgree": 20,
            "agree": 18,
            "disagree": 21,
            "stronglyDisagree": 18
          },
          {
            "statement": "Aporta valor",
            "participation": 20,
            "stronglyAgree": 25,
            "agree": 3,
            "disagree": 9,
            "stronglyDisagree": 24
          },
          {
            "statement": "Es de calidad",
            "participation": 20,
            "stronglyAgree": 25,
            "agree": 6,
            "disagree": 7,
            "stronglyDisagree": 29
          },
          {
            "statement": "En general estoy satisfecho",
            "participation": 20,
            "stronglyAgree": 12,
            "agree": 26,
            "disagree": 8,
            "stronglyDisagree": 21
          }
        ]}
        id="statement"
        value="participation"
        dimensions={[
            {
                id: 'Muy en desacuerdo',
                value: 'stronglyDisagree'
            },
            {
                id: 'En desacuerdo',
                value: 'disagree'
            },
            {
                id: 'De acuerdo',
                value: 'agree'
            },
            {
                id: 'Muy de acuerdo',
                value: 'stronglyAgree'
            }
        ]}
        innerPadding={9}
        axisTop={null}
        axisRight={{
            orient: 'right',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 0,
            truncateTickAt: 0
        }}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Participación',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Opiniones',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        margin={{ top: 40, right: 80, bottom: 120, left: 80 }}
        colors={{ scheme: 'red_grey' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'rgba(0, 0, 0, 0)',
                color: 'inherit',
                rotation: -45,
                lineWidth: 4,
                spacing: 8
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Muy de acuerdo'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Muy en desacuerdo'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 80,
                itemsSpacing: 0,
                itemWidth: 140,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'right-to-left',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  )
}
