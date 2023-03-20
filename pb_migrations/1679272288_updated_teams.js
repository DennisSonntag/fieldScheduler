migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9qjqdl38jskc72x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awntk1dp",
    "name": "team_type",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "\\b(srBoys|jrBoys|srGirls|jrGirls)\\b"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9qjqdl38jskc72x")

  // remove
  collection.schema.removeField("awntk1dp")

  return dao.saveCollection(collection)
})
