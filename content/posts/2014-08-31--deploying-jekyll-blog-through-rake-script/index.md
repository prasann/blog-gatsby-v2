---
title: Deploying Jekyll site for Github pages through rake script
menuTitle: Deploying Jekyll site for Github pages through rake script
subTitle: Deploying jekyll blog or site for Github pages using rake script.
postDescription: Deploying jekyll blog or site for Github pages using rake script.
category: Tech
---
This blog is powered by Jekyll and I use Github pages as web server.

#### Branch structure in Github

Github by default publish the contents of the master branch as a github page. So i have created two branches in the repository.

**source:** contains Jekyll based folder structure. \_drafts, \_posts, \_site etc. All the new posts are added in the drafts folder first and then once its written fully it is then moved to \_posts folder and are then ready to be published.

**master:** is simply a generated content from the rake script. This branch has all the HTML files that are generated using Jekyll gem.

#### Folder structure in Dev box

I have both the branches checked out in different folders. Both these folders are present in the same level (will be useful while generating output)

#### Rake script

##### To generate HTML

I have the Rakefile in the root level of my source branch. The rake task mentioned below will create HTML equivalent inside the \_site folder.

task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "\_site"
  })).process
end
    

##### To publish in Github

This task copies the entire \_site folder into the master branch (locally). This is why i need to checkout both master and source branches separately and keep them in the same level.

After copying the contents, simply it switches to the master branch and does a git push.

Once the changes are pushed into github's master branch the changes are then reflected in your site immediately.

task :publish => \[:generate\] do
  cp\_r "\_site/.", LOCAL\_DIR\_NAME
  cp ".travis.yml", LOCAL\_DIR\_NAME
  pwd = Dir.pwd
  Dir.chdir LOCAL\_DIR\_NAME
  system "git add --all"
  message = "Site updated at #{Time.now.utc}"
  system "git commit -m #{message.inspect}"
  system "git push origin master:refs/heads/master"
  Dir.chdir pwd
end