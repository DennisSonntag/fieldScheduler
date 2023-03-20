migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9qjqdl38jskc72x")

  // remove
  collection.schema.removeField("srbbkrxp")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9qjqdl38jskc72x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "srbbkrxp",
    "name": "team_type",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
