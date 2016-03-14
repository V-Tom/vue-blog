const core = require('./core');
(()=> {


    'use strict';

    class App extends core {
        constructor(x, y) {
            super(x, y);
        }

        /*
         @reference:find(query)
         @param:{JSON object}-->The cursor query object
         @pram:{JSON object} --> The cursor object
         @return:{JSON result}
         */
        find(query, cursor) {
            var _DBName = this._DBName,
                _DBCollection = this._DBCollection;
            return new Promise((resolve, reject)=> {
                if (typeof query !== 'object') {
                    reject('query must be an object');
                } else {
                    MongoClient.connect(_DBName, (err, db)=> {
                        if (err) {
                            db.close();
                            reject(err);
                        } else {
                            var collection = db.collection(_DBCollection);
                            if (cursor) {
                                let key, CURSOR;
                                CURSOR = collection.find(query);
                                try {
                                    for (key in cursor) {
                                        if (cursor.hasOwnProperty(key)) {
                                            CURSOR[key](cursor[key])
                                        }
                                    }
                                } catch (ex) {
                                    db.close();
                                    reject(ex);
                                }
                                CURSOR.toArray().then((result) => {
                                    resolve(result)
                                }).catch((err)=> {
                                    reject(err)
                                }).always(()=> {
                                    db.close();
                                });
                            } else {
                                collection.find(query).toArray().then((result) => {
                                    resolve(result)
                                }).catch((err)=> {
                                    reject(err)
                                }).always(()=> {
                                    db.close();
                                });
                            }
                        }
                    });
                }
            });
        }
    }

    module.exports = App;

})();
