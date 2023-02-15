const url2 =`https://cdn.contentful.com/spaces/${spaceID}/environments/${environmentID}/entries?access_token=${accessToken}&content_type=drinkItem`

const sectionTag2 = document.querySelector("section.drinks")

const grabData2 = function() {
  return fetch(url2)
    .then(response => response.json())
    .then(data => {

      // const assets2 = data.includes.Asset

      // turn the data we get back from contentful into something more usable, exclude extra field data
      return data.items.map(item => {
        return item.fields
      })
    })
}

grabData2().then(data => {

  sectionTag2.innerHTML = ""

  data.forEach(item => {
     sectionTag2.innerHTML = sectionTag2.innerHTML +  `

    <div class="drink-container">

      <div class="drink-item">
        <p>${item.title}</p>
        <p>${item.price}</p>
      </div>

      <p class="drink-description">${item.description}</p>

    </div>
  `
  })
})