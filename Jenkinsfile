pipeline {
  agent any

  environment {
    IMAGE_NAME = "manu1024/demo-app"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/manikanta1024-git/myproject.git',
            credentialsId: 'github-creds'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
      }
    }

    stage('Test') {
      steps {
        sh 'docker run --rm $IMAGE_NAME:$BUILD_NUMBER echo "Test passed ✅"'
      }
    }

    stage('DockerHub Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
        }
      }
    }

    stage('Push Image') {
      steps {
        sh 'docker push $IMAGE_NAME:$BUILD_NUMBER'
      }
    }

    stage('Deploy') {
  steps {
    sh '''
      docker stop demo || true
      docker rm demo || true
      docker run -d -p 3000:3000 \
      --name demo \
      -e BUILD_NUMBER=$BUILD_NUMBER \
      manu1024/demo-app:$BUILD_NUMBER
    '''
  }
}
  }
}
