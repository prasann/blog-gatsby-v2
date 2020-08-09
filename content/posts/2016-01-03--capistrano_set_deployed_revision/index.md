---
title: Set deployed Git revision using Capistrano 3
menuTitle: Set deployed Git revision using Capistrano 3
subTitle: While deploying Rails application using Capistrano 3, recording the current deployed git revision to be used by Rails applicaiton.
postDescription: While deploying Rails application using Capistrano 3, recording the current deployed git revision to be used by Rails applicaiton.
category: Tech,Capistrano,Rails
---
We use Capistrano to deploy our Rails application. Recently i upgraded our capistrano version from 2 to 3

Capistrano 3 has a complete DSL changeover. Apart from this one other major change I figured out was the way a Git repository is been deployed.

Previously a Git repository is cloned in the deploy location. Now in Cap 3 a Git archive is been downloaded to the deploy location. This means the deploy directory is no more a Git repository. During Cap 2 times, we used to run a 'git log' command in the deployed driectory to find the deployed revision. Now after upgrade I am unable to do this.

Cap 3 has got a REVISION file, which contain the SHA of the deployed commit. This wasn't useful in our case, as we show this message in our web application.

So i ended up writing a Cap task using a similar logic to create a REVISION file with our custom formatted Git message.

    namespace :deploy do
      task :add\_revision\_file do
        on roles(:app) do
          within repo\_path do
            execute(:git, :'log', :"--pretty=format:'%h | %ai | %d %s'", :'-1',
            :"#{fetch(:branch)}", ">#{release\_path}/REVISION")
          end
        end
      end
    end
  

    after 'deploy:updating', 'deploy:add\_revision\_file'
  

This will overwrite the REVISION file created by Cap with our custom message. Which will be consumed by our application.