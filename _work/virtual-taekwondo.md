---
title: Virtual Taekwondo
order: 2
description: "Full-stack on Virtual Taekwondo: Unreal gameplay and networking, serverless Node.js backend on AWS. Featured in the Olympic Esports Series."
image: /assets/img/virtual-taekwondo.jpg
card:
  cap: "2019–22 · Senior Programmer"
  subtitle: "Motion-tracked fighting game · Unreal · AWS"
  alt: Virtual Taekwondo character key art
  cut: b
eyebrow: "2019–2022 · Unreal Engine"
role: Senior Gameplay Programmer
lede: "A multiplayer fighting game that turns players’ real movements into real-time, one-on-one combat. Featured in the **Olympic Esports Series**. I worked full-stack: Unreal gameplay and networking on the client, and a serverless Node.js backend on AWS that powers match data, player telemetry and core game logic."
facts:
  - { label: Studio, value: "Deep Dive Studio, Singapore" }
  - { label: Engine, value: "Unreal Engine · C++" }
  - { label: Backend, value: "Node.js on AWS Lambda · GameLift · DynamoDB · Cognito" }
sections:
  - type: video
    youtube: U1tYPJGB3Zs
    thumbnail: /assets/img/yt/U1tYPJGB3Zs.jpg
    title: World Taekwondo virtual sparring showcase
    alt: Virtual Taekwondo video thumbnail
    label: World Taekwondo showcase
    play: Play video
  - type: columns
    items:
      - type: text
        heading: Cloud architecture
        cut: a
        bullets:
          - "Architected the full-stack backend on **Node.js and AWS Lambda** (serverless): high-scalability services powering match data, player telemetry and core game logic."
          - "Built on **GameLift, DynamoDB, Cognito, API Gateway and CloudWatch**."
          - "Initiated and managed technical discussions with **AWS Game Tech** representatives to bridge the gap in cloud technology adoption."
      - type: text
        heading: Gameplay & networking
        cut: b
        bullets:
          - "Led 3 engineers delivering the core gameplay features."
          - "**LAN and client-server** architecture in Unreal for fast-paced one-on-one matches."
          - "Motion capture pipeline through **Live Link** and Animation Blueprints."
          - "Game finite state machine driving match flow. Damage system, UI and HUD, player input, scene management."
          - "Multiplayer **Go** board game at the same studio: gRPC backend in Go, Unity C# client."
  - type: gallery
    items:
      - type: image
        width: 4
        cut: c
        image: /assets/img/virtual-taekwondo.jpg
        alt: Virtual Taekwondo character line-up key art
        caption: Key art
      - type: image
        width: 2
        cut: d
        image: /assets/img/others/vt-waiting-room.jpg
        alt: Waiting room screen with fighter selection and versus display
        caption: Waiting room · UI
---
