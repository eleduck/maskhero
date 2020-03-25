require 'mina/git'
set :application_name, 'maskhero'
set :domain, 'baibonjwa.com'
set :deploy_to, '/var/www/maskhero'
set :repository, 'git@github.com:eleduck/maskhero.git'
set :branch, 'dev'
set :user, 'happybai'          # Username in the server to SSH to.

set :nvm_path, '/home/happybai/.nvm/scripts/nvm'

set :shared_dirs, fetch(:shared_dirs, []).push()
set :shared_files, fetch(:shared_files, []).push('.env')

task :remote_environment do
  command 'echo "-----> Loading nvm"'
  command %{
    source ~/.nvm/nvm.sh
  }
  command 'echo "-----> Now using nvm v.`nvm --version`"'
  command 'export PATH="$HOME/.yarn/bin:$PATH"'
end

task :setup do
  # command %{rbenv install 2.3.0 --skip-existing}
end

desc "Deploys the current version to the server."
task :deploy do
  invoke :'git:ensure_pushed'
  deploy do
    invoke :'git:clone'
    command "nvm use node 10.15.3"
    invoke :'deploy:link_shared_paths'

    command "yarn install"
    command "yarn build"

    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        command %{mkdir -p tmp/}
        command %{touch tmp/restart.txt}
      end
    end
  end
end