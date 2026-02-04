pipeline {
  agent any
  stages {
    stage('Checkout') { steps { git branch: 'main', url: 'https://github.com/YOURUSERNAME/docker-jenkins-demo.git' } }
    stage('Build Docker') { steps { sh 'docker build -t yourdockerid/demo-app:$BUILD_NUMBER .' } }
    stage('Test') { steps { sh 'docker run --rm yourdockerid/demo-app:$BUILD_NUMBER echo "Test passed"' } }
    stage('Push') { steps { sh 'echo "Login to Docker Hub & push" && docker push yourdockerid/demo-app:$BUILD_NUMBER' } }
    stage('Deploy') { steps { sh 'docker stop demo || true && docker rm demo || true && docker run -d -p 3000:3000 --name demo yourdockerid/demo-app:$BUILD_NUMBER' } }
  }
}
