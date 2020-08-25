// TODO: get user location
//       calculate distance
//       show stats:
//              distance
//              user location
//              space station location

function SpaceStation({ sslocation }) {
  let date = new Date(sslocation.timestamp * 1000)
  let hours = date.getHours()
  let minutes = "0" + date.getMinutes()
  let seconds = "0" + date.getSeconds()
  let timestamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

  return (
    <div>
      <h1>{sslocation.name}</h1>
      <ul>
        <li>Latitude: {sslocation.latitude}</li>
        <li>Longitude: {sslocation.longitude}</li>
        <li>Altitude: {sslocation.altitude} miles</li>
        <li>Velocity: {sslocation.velocity} mph</li>
        <li>Visibility: {sslocation.visibility}</li>
        <li>Footprint: {sslocation.footprint}</li>
        <li>Timestamp: {timestamp}</li>
        <li>Solar Latitude: {sslocation.solar_lat}</li>
        <li>Solar Longitude: {sslocation.solar_lon}</li>
      </ul>
    </div>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get space station location
  const url = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles'
  const res = await fetch(url)
  const sslocation = await res.json()

  // By returning { props: sslocation }, the SpaceStation component
  // will receive 'sslocation' as a prop at built time
  return {
    props: {
      sslocation,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

export default SpaceStation