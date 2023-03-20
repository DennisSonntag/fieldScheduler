migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aep6rrexhwg7s8g")

  // update
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
      "pattern": "\\b(cru|irish)\\b"
    }
  }))

  // update
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
      "pattern": "\\b(none|alt|single|double)\\b"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aep6rrexhwg7s8g")

  // update
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

  // update
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
})
