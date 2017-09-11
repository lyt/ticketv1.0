FROM index.alauda.cn/rongchang/rvm_ruby:2.1.2


ENV RAILS_ENV=production
ENV APP_HOME /app

Run  echo -e "\n\
Host gitlab.edaixi.com\n\
  HostName gitlab.edaixi.com\n\
  IdentityFile ~/.ssh/github\n\
  StrictHostKeyChecking no\n\
" >> /root/.ssh/config

RUN sed -i 's/ssh.github.com/github.com/g' /root/.ssh/config
RUN sed -i '/443/d' /root/.ssh/config

RUN mkdir -p $APP_HOME /var/log/app -p
RUN mkdir $APP_HOME/log/nginx $APP_HOME/tmp -p
WORKDIR $APP_HOME

COPY . $APP_HOME

#RUN bash -l -c "bundle config mirror.https://ruby.taobao.org http://172.31.2.162:9292 && bundle config mirror.https://gems.ruby-china.org http://172.31.2.162:9292 && bundle install"


COPY docker/nginx.conf /opt/nginx/nginx/conf/nginx.conf
EXPOSE 80

ENTRYPOINT ["docker/entrypoint.sh"]

CMD ["supervisord", "-c", "/app/docker/supervisord.conf"]
