module.exports = function(app){
  app.dataSources.assets.connector.getFilename = function (file, req, res) {
    //file.name is original filename uploaded
    var filename = req.query.filename || 'general.ext';
    return filename;
    }
  };