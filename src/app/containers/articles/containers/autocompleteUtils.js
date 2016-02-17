export let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}


export function matchStateToTerm (state, value) {
  console.log('staaaaaaa', state, value)
  return (
    state.screen_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    //state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

export function sortStates (a, b, value) {
  console.log('xxxxxxxtaaaaaaa', a, b, value)
  return (
    a.screen_name.toLowerCase().indexOf(value.toLowerCase()) >
    b.screen_name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
  )
}
//
//export function fakeRequest (value, cb) {
//  if (value === '')
//    return getStates()
//  var items = getStates().filter((state) => {
//    return matchStateToTerm(state, value)
//  })
//  setTimeout(() => {
//    cb(items)
//  }, 500)
//}

export function getStates() {
  return [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
    { abbr: "AR", name: "Arkansas"},
    { abbr: "CA", name: "California"},
    { abbr: "CO", name: "Colorado"},
    { abbr: "CT", name: "Connecticut"},
    { abbr: "DE", name: "Delaware"},
    { abbr: "FL", name: "Florida"},
    { abbr: "GA", name: "Georgia"},
    { abbr: "HI", name: "Hawaii"},
    { abbr: "ID", name: "Idaho"},
    { abbr: "IL", name: "Illinois"},
    { abbr: "IN", name: "Indiana"},
    { abbr: "IA", name: "Iowa"},
    { abbr: "KS", name: "Kansas"},
    { abbr: "KY", name: "Kentucky"},
    { abbr: "LA", name: "Louisiana"},
    { abbr: "ME", name: "Maine"},
    { abbr: "MD", name: "Maryland"},
    { abbr: "MA", name: "Massachusetts"},
    { abbr: "MI", name: "Michigan"},
    { abbr: "MN", name: "Minnesota"},
    { abbr: "MS", name: "Mississippi"},
    { abbr: "MO", name: "Missouri"},
    { abbr: "MT", name: "Montana"},
    { abbr: "NE", name: "Nebraska"},
    { abbr: "NV", name: "Nevada"},
    { abbr: "NH", name: "New Hampshire"},
    { abbr: "NJ", name: "New Jersey"},
    { abbr: "NM", name: "New Mexico"},
    { abbr: "NY", name: "New York"},
    { abbr: "NC", name: "North Carolina"},
    { abbr: "ND", name: "North Dakota"},
    { abbr: "OH", name: "Ohio"},
    { abbr: "OK", name: "Oklahoma"},
    { abbr: "OR", name: "Oregon"},
    { abbr: "PA", name: "Pennsylvania"},
    { abbr: "RI", name: "Rhode Island"},
    { abbr: "SC", name: "South Carolina"},
    { abbr: "SD", name: "South Dakota"},
    { abbr: "TN", name: "Tennessee"},
    { abbr: "TX", name: "Texas"},
    { abbr: "UT", name: "Utah"},
    { abbr: "VT", name: "Vermont"},
    { abbr: "VA", name: "Virginia"},
    { abbr: "WA", name: "Washington"},
    { abbr: "WV", name: "West Virginia"},
    { abbr: "WI", name: "Wisconsin"},
    { abbr: "WY", name: "Wyoming"}
  ]
}


//<Autocomplete
//  initialValue=""
//  items={folowers}
//  getItemValue={(item) => item.screen_name}
//  shouldItemRender={matchStateToTerm}
//  sortItems={sortStates}
//  renderItem={(item, isHighlighted) => {
//            console.log('iiiii', item)
//            return (
//            <div
//              style={isHighlighted ? styles.highlightedItem : styles.item}
//              key={item.screen_name}
//            >{item.screen_name}</div>
//            )}
//          }/>


//componentDidMount() {
//  getFollowers()
//    .then( res => {
//      //console.log('Followers list', res.message.users)
//      window._followers = res.message.users
//    })
//    .catch(res => {
//      console.log('meee', res)
//    })
//  //this.setState({})
//}