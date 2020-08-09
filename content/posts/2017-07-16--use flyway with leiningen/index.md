---
title: Flyway migrations in lein clojure
subTitle: Integrating flyway migrations to compojure apps.
postDescription: Flyway is a popular Java based database migration tool. This post describes about integrating flyway seamlessly with lein compojure ring stack in clojure.
category: Clojure
---
[Leiningen](https://leiningen.org/) is the easiest way to start with clojure project automation. The project under discussion is a webservices written in clojure with [compojure-api](https://github.com/metosin/compojure-api) and [ring](https://github.com/ring-clojure/ring) middleware.

When it came to Database migrations, I didn't find anything straightforward amongst the lein plugins. So, decided to use [flyway](https://flywaydb.org/). I have worked with flyway in the past with Java applications. But, this is the first time with clojure, leiningen combination.

### Migration utility in clojure

Here is the small migration helper written in Clojure

```clojure
(ns app.migration
  (:require [environ.core :refer [env]])
  (:import org.flywaydb.core.Flyway
           org.flywaydb.core.internal.info.MigrationInfoDumper))

;; Build DB String from the Environment Variables
(def db-url (str "jdbc:postgresql://"
                 (env :pg-db-host) ":"
                 (env :pg-db-port) "/" (env :pg-db-name)))

;; Initialize Flyway object
(def flyway
  (let [locations (into-array String ["classpath:db/migration"])]
    (doto (new Flyway)
      (.setDataSource db-url (env :pg-db-user) (env :pg-db-password) (into-array String []))
      (.setLocations locations))))

(defn migrate [] (.migrate flyway))

(defn clean [] (.clean flyway))

(defn reset [] (clean) (migrate))

(defn info []
  (println (MigrationInfoDumper/dumpToAsciiTable (.all (.info flyway)))))
```

### Running migration during deployment

I'm using [lein-ring](https://github.com/weavejester/lein-ring) plugin, this provided an option to execute function before the handler starts. So, I wired app.migrate to the init block of the handler.

This helps to run migration everytime before the application deploys. Ofcourse, flyway will take care of what migrations need to run based on the migration version.

### Running migrations for local development

The above method works perfectly for the application deployment scenarios. However, in local it will be better to execute​ ​migration and clean databases as and when required, rather than re-deploying the application. lein-exec plugin offers​ ​a way to create and execute clojure code from project.clj files. With the above-mentioned migration present, all ​I​​ ha​ve to do is to create some aliases as shown below.
```clojure
:aliases { 
    "db-clean"   ["exec" "-ep" "(use 'deal-picker.migration) (clean)"]
    "db-migrate" ["exec" "-ep" "(use 'deal-picker.migration) (migrate)"]
    "db-info"    ["exec" "-ep" "(use 'deal-picker.migration) (info)"]
    "db-reset"   ["exec" "-ep" "(use 'deal-picker.migration) (reset)"]
}
```