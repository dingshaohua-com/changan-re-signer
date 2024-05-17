@echo off

cd .\file

echo ------------------------------生成私钥---------------------
openssl genrsa -out private.key 2048

echo ------------------------------生成v1证书---------------------
openssl req -new -key private.key -out csr.csr -subj "/emailAddress=auto_release@auto-pai.com/CN=SCM/OU=Software/O=WTCL/L=HaiDian/ST=Beijing/C=CN"
openssl x509 -req -in csr.csr -signkey private.key -out certificate.crt -days 18250 -set_serial 0xddb66eefd98476f3

echo ------------------------------将证书和私钥导出到 PKCS12 格式的密钥库文件---------------------
openssl pkcs12 -export -in certificate.crt -inkey private.key -out cert.p12 -name cert -passout pass:123456789

echo ------------------------------生成jks---------------------
keytool -importkeystore -srckeystore cert.p12 -srcstorepass 123456789 -srcstoretype PKCS12 -destkeystore cert.jks -deststoretype JKS -deststorepass 123456789 -noprompt

echo ------------------------------签名---------------------
apksigner sign --ks cert.jks --ks-key-alias "cert" --ks-pass pass:123456789 --out signed.apk input.apk  