sed -i s#\\\${ENV}#$ENVIROMENT#g ./*.yaml
sed -i s#\\\${INGRESS_DOMAIN}#$INGRESS_DOMAIN#g ./*.yaml
