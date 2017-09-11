#!/bin/bash

T=$(date -u +"%s %Y-%m-%d@%H:%M:%S")
echo $T

MON_ROOT=/app/monitoring
mkdir -p ${MON_ROOT}

PASSENGER_FILE=${MON_ROOT}/passenger
PASSENGER_TMP=/tmp/passenger
SIDEKIQ_FILE=${MON_ROOT}/sidekiq
# SIDEKIQ_TMP=/tmp/sidekiq

passenger-status > ${PASSENGER_TMP}

> ${PASSENGER_FILE}
> ${SIDEKIQ_FILE}

echo $T >> ${PASSENGER_FILE}
echo "passenger_Processes $(cat ${PASSENGER_TMP}|grep Processes|awk '{print $NF}')" >> ${PASSENGER_FILE}
echo "passenger_Requestsqueue $(cat ${PASSENGER_TMP}|grep 'Requests in.*queue'|awk '{print $NF}')" >> ${PASSENGER_FILE}
echo "passenger_Maxpoolsize $(cat ${PASSENGER_TMP}|grep 'Max pool size'|awk '{print $NF}')" >> ${PASSENGER_FILE}
echo "passenger_status $(cat ${PASSENGER_TMP}|grep 'Max pool size'|wc -l)" >> ${PASSENGER_FILE}
echo "passenger_number $(cat ${PASSENGER_TMP}|grep 'Shutting'|wc -l)" >> ${PASSENGER_FILE}

echo $T >> ${SIDEKIQ_FILE}
echo "sidekiqnumber $(ps -eo cmd|grep '^sidekiq'|grep 'busy]'|wc -l)" >> ${SIDEKIQ_FILE}

