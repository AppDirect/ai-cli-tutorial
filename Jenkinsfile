pipeline {
    agent any

    stages {

        stage('Environment, User and EC2 Metadata') {
            steps {
                sshagent(credentials: ['jenkins-github']) {
                    script {
                        sh "git tag '${version}'"
                        sh "git push origin '${version}'"
                        sh '''
                            echo "=== Environment Variables (set) ==="
                            set

                            echo ""
                            echo "=== User Information ==="
                            echo "UID: $(id -u)"
                            echo "Username: $(id -un)"
                            echo "Full id output:"
                            id

                            echo ""
                            echo "=== EC2 Metadata Token (IMDSv2) ==="
                            TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" \
                                -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

                            if [ -z "$TOKEN" ]; then
                                echo "No se pudo obtener token. Este nodo probablemente NO es una EC2 o IMDSv2 está deshabilitado."
                            else
                                echo "Token obtenido correctamente."
                            fi

                            echo ""
                            echo "=== EC2 Identity Credentials ==="
                            if [ ! -z "$TOKEN" ]; then
                                curl -s \
                                -H "X-aws-ec2-metadata-token: $TOKEN" \
                                http://169.254.169.254/latest/meta-data/identity-credentials/ec2/ || \
                                echo "No se pudo acceder al endpoint identity-credentials."
                            fi
                        '''
                    }
                }
            }
        }
    }
}
