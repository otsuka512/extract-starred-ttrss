var pg = require('pg');
var config = require('config');
var moment = require('moment');

var conString = "postgres://" + config.dbConfig.dbUser + ":" + config.dbConfig.dbPass + "@"
    + config.dbConfig.host + ":" + config.dbConfig.port + "/" + config.dbConfig.dbName;

var sqlstr = "SELECT ttrss_entries.title,ttrss_entries.link,ttrss_user_entries.last_marked \
FROM ttrss_user_entries INNER JOIN ttrss_entries ON ttrss_entries.id = ttrss_user_entries.int_id \
WHERE ttrss_user_entries.marked = TRUE \
ORDER BY ttrss_user_entries.last_marked DESC;"

pg.types.setTypeParser(1114, function(stringValue) {
    return stringValue + "+0000";
});

var client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var query = client.query(sqlstr);
    query.on('error', function(err) {
      return console.error('error running query', err);
    });
    query.on('row', function(row) {
      //console.error('result ',row);
      var lastm = moment(row.last_marked);
      var ttl = row.title;
      ttl = ttl.replace(/"/g,"");
      ttl = ttl.replace(/\n/g," ");
      console.log('* "%s":%s [%s]', ttl, row.link, lastm.format("YYYY-MM-DD HH:mm:ss+0900"));
    });
    query.on('end', function(result) {
      // console.log(result.rowCount + ' rows were received');
      client.end();
    });
});
