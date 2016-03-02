Extract starred articles from ttrss database.

## summary

* name: extract-starred-ttrss
* author: otsuka512@gmail.com
* description: extract starred articles from ttrss database

[otsuka512/docker-ttrss](https://github.com/otsuka512/docker-ttrss) で、
不用意に database container を止めてしまった際に、バックアップから
「お気に入りの記事」を集めて Redmine textile 形式で書き出す。

## howto use

node index.js > ttrss-starred-articles.textile

## To Do

node-postgres で Time Zone の扱いがおかしいので下記を参考に修正。
[node.js - Use node-postgres to get Postgres "timestamp without timezone" in utc - Stack Overflow](http://stackoverflow.com/questions/20712291/use-node-postgres-to-get-postgres-timestamp-without-timezone-in-utc)
```js
pg.types.setTypeParser(1114, function(stringValue) {
    return stringValue + "+0000";
});
```
出力がJST固定なので注意。

End.
