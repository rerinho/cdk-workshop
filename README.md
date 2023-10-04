# AWS CDK Workshop

This project is the result of my studies on the [AWS CDK Workshop website](https://cdkworkshop.com/). It serves as both a learning exercise and a practical implementation of the concepts I've learned throughout the workshop.

## Table of Contents
- [About the Workshop](#about-the-workshop)
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)

## About the Workshop

The AWS CDK Workshop is a comprehensive guide to building infrastructure as code using the AWS Cloud Development Kit (CDK). It covers various topics related to AWS CDK, including the creation of AWS resources, application deployment, and best practices for managing infrastructure using code.

For more details, visit the [CDK Workshop website](https://cdkworkshop.com/).

## Project Overview

This project is a practical implementation of the AWS CDK concepts I learned during the workshop. It includes the following:

- Create new CDK applications
- Define app’s infrastructure using the AWS Construct Library
- Create my own constructs
- Deploy CDK apps to AWS account
- Consume constructs published by other people
- Test Constructs via CDK assert library

## Getting Started

To run this project locally or in your AWS environment, follow the steps below.

### Prerequisites

Before you begin, ensure you have all the prerequisites. For more details, visit the [CDK Workshop prequisites page](https://cdkworkshop.com/15-prerequisites.html).

### Installation

1. Clone this repository to your local machine:
```bash
git clone https://github.com/rerinhi/cdk-workshop.git
```
2. Navigate to the project directory:
```bash
cd cdk-workshop
  ```
3. Install the project dependencies:
```bash
npm install
```

### Usage

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk list`        list all stacks available to deploy
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk destroy`     destroy this stack of your default AWS account/region



   
