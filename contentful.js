const spaceID = "yhfxvrp9l8jz"
const environmentID = "master"
const accessToken = "PEROTeA6Babai-PnUQM0aMHcQqt1vHL-9Hk6EBBkNbY"

const url =`https://cdn.contentful.com/spaces/${spaceID}/environments/${environmentID}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`

const sectionTag = document.querySelector("section.grid")

const grabData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {

      const assets = data.includes.Asset

      // turn the data we get back from contentful into something more usable, exclude extra field data
      return data.items.map(item => {
        let imageUrl = "image1.jpg"

        // a long path, but the image upload id is hidden pretty well in the JSON from Contentful
        const imageId = item.fields.photo.sys.id

        const imageData = assets.find(asset => {
          return asset.sys.id == imageId
        })

        if (imageData) {
          imageUrl = imageData.fields.file.url
        }

        if (imageUrl.startsWith('//')) {
          imageUrl = imageUrl.split('//').join('https://')
        }

        item.fields.photo = imageUrl
        return item.fields
      })
    })
}

grabData().then(data => {
  // console.log(data)

  sectionTag.innerHTML = ""

  data.forEach(item => {
     sectionTag.innerHTML = sectionTag.innerHTML +  `
      <div class="item">
        <img src="${item.photo}">
        <div class="title">
          <h2> ${item.title} </h2>
          <p>${item.price}</p>
        </div>
        
        <p>${item.description}</p>
      </div>
    `
  })
})

