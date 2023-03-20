migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aep6rrexhwg7s8g")

  // remove
  collection.schema.removeField("cu414man")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gml5fvgn",
    "name": "alt_field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "patbf37r",
    "name": "has_field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aep6rrexhwg7s8g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cu414man",
    "name": "has_field",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("gml5fvgn")

  // remove
  collection.schema.removeField("patbf37r")

  return dao.saveCollection(collection)
})
