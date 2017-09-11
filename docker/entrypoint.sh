#!/bin/bash

# 适配测试环境的sso，生成唯一sso client uid
if [ ${PORT_80_HTTP} ]
then
    echo "http"
    SSO_ID_PREFIX=$(echo ${PORT_80_HTTP}| grep -o -P "\/\/.*\.?.*\-" | sed 's/-$//' | tr '-' '.' | tr -d '/')
elif [ ${PORT_80_TCP} ]
then
    echo "tcp"
    SSO_ID_PREFIX=$(echo ${PORT_80_TCP}| grep -o -P "\/\/.*\.?.*\-" | sed 's/-$//' | tr '-' '.' | tr -d '/')
fi

export SSO_ID="${SSO_ID_PREFIX}.docker"

# 如果是需要多容器同步的时间戳, 使用这个变量, 等号后面的默认值可以替换
TS=$(date +"%s" -d "${__CREATE_TIME__}")

run_in_test() {
	  # 生成nginx的logid
    export SVC_ID="$(echo ${SSO_ID_PREFIX}| tr '.' '0')0t"
    bash -l -c "ruby /app/docker/waiting_ports.rb /app/docker"
    cp -r /app/docker/${RUN_ENV}/config/* /app/config/
    bash -l -c "RAILS_ENV=production bundle exec rake db:migrate"
    bash -l -c "RAILS_ENV=production bundle exec rake assets:precompile"
}

run_in_production() {
    export SVC_ID="${SSO_ID_PREFIX}"   # 生成nginx的logid
    git clone git@gitlab.edaixi.com:niexz/docker-configure-online.git
    cp -a docker-configure-online/production/ticket1/config/* /app/config/
    cat docker-configure-online/production/ticket1/ticket1.conf > /app/docker/nginx/app.conf
    cat docker-configure-online/production/hosts >> /etc/hosts
    rm -rf docker-configure-online

    # bash -l -c "RAILS_ENV=production bundle exec rake db:migrate"
    #bash -l -c "RAILS_ENV=production bundle exec rake assets:precompile"

    #/srv/splunkforwarder/bin/splunk start
    #touch /app/log/notify.log
    #/srv/splunkforwarder/bin/splunk add monitor -auth admin:changeme /app/log/notify.log
    #wuliu touch /app/log/auto_dispatcher.log
    #wuliu /srv/splunkforwarder/bin/splunk add monitor -auth admin:changeme /app/log/auto_dispatcher.log

    'aaaaaa' # load crontab
}

case ${RUN_ENV:=production} in
      production)
            echo "production"
            run_in_production
            ;;
      test)
            echo "test"
            run_in_test
            ;;
      *)
            echo "default"
            run_in_production
            ;;
esac


# 设置log tag，输出到elk
sed -i "/access_log/s/|SVC_ID|/${SVC_ID}/" /app/docker/nginx/app.conf
sed -i "/FileTag/s/|SVC_ID|/${SVC_ID}/" /app/docker/rsyslog.conf

exec "$@"
