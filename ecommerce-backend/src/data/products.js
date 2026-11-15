const products = [
  {
    "name": "MacBook Pro M3 Max 14-inch",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    "description": "The ultimate 14-inch laptop for professionals, featuring the Apple M3 Max chip, 36GB RAM, and 1TB SSD with Liquid Retina XDR display.",
    "brand": "Apple",
    "category": "Computers",
    "price": 3199.99,
    "countInStock": 10,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Alex Rivera",
        "rating": 5,
        "comment": "Handles multiple Docker containers and local LLM builds completely silently."
      },
      {
        "name": "Sarah Chen",
        "rating": 5,
        "comment": "The XDR display sharpness and 18-hour battery life are unmatched for coding."
      },
      {
        "name": "Faruk Aydin",
        "rating": 5,
        "comment": "Zero thermal throttling during heavy full-stack TypeScript and WebGL builds."
      }
    ]
  },
  {
    "name": "Sony WH-1000XM5 Wireless ANC Headphones",
    "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    "description": "Industry-leading active noise cancellation, 30 hours of battery life, and crystal-clear microphone array for remote stand-ups.",
    "brand": "Sony",
    "category": "Audio",
    "price": 398.99,
    "countInStock": 15,
    "rating": 4.7,
    "numReviews": 3,
    "reviews": [
      {
        "name": "David Kim",
        "rating": 5,
        "comment": "Blocks out open-office chatter completely. Best investment for deep work sessions."
      },
      {
        "name": "Elena Rostova",
        "rating": 5,
        "comment": "Super lightweight ear cups and crystal clear voice quality on daily Zoom calls."
      },
      {
        "name": "Marcus Vance",
        "rating": 4,
        "comment": "Multipoint Bluetooth pairing switches smoothly between my MacBook and phone."
      }
    ]
  },
  {
    "name": "Keychron Q1 Pro Custom Mechanical Keyboard",
    "image": "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    "description": "75% layout custom mechanical keyboard featuring a full CNC aluminum body, wireless Bluetooth, QMK/VIA support, and hot-swappable tactile switches.",
    "brand": "Keychron",
    "category": "Accessories",
    "price": 199,
    "countInStock": 8,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Marcus Vance",
        "rating": 5,
        "comment": "The gasket-mount typing feel and VIA macro customization are phenomenal."
      },
      {
        "name": "Liam OConnor",
        "rating": 5,
        "comment": "Heavy CNC aluminum build stays planted on the desk. Best tactile switches out of the box."
      },
      {
        "name": "Faruk Aydin",
        "rating": 5,
        "comment": "Programmed custom Git and terminal shortcuts directly into layer 2 via VIA."
      }
    ]
  },
  {
    "name": "Apple iMac 27-inch 5K Retina All-in-One",
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    "description": "Iconic 27-inch 5K Retina all-in-one desktop workstation featuring 500 nits brightness, P3 wide color gamut, and Magic Keyboard bundle.",
    "brand": "Apple",
    "category": "Computers",
    "price": 1799,
    "countInStock": 5,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Noah Patel",
        "rating": 5,
        "comment": "Text rendering in VS Code and terminal windows is razor sharp on the 5K panel."
      },
      {
        "name": "Chloe Bennett",
        "rating": 5,
        "comment": "Clean all-in-one aluminum footprint keeps my engineering desk clutter-free."
      },
      {
        "name": "Daniel Craig",
        "rating": 5,
        "comment": "5K resolution easily fits side-by-side code editors and browser DevTools."
      }
    ]
  },
  {
    "name": "Logitech M720 Triathlon Wireless Mouse",
    "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    "description": "Contoured wireless developer mouse featuring hyper-fast dual-mode scroll wheel, Easy-Switch pairing for up to 3 computers, and 24-month battery life.",
    "brand": "Logitech",
    "category": "Accessories",
    "price": 69,
    "countInStock": 25,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Ryan Foster",
        "rating": 5,
        "comment": "Switches between my work MacBook and Linux desktop with a single thumb button."
      },
      {
        "name": "Hannah Abbott",
        "rating": 5,
        "comment": "Ergonomic sculpted grip eliminated my wrist fatigue during long coding sprints."
      },
      {
        "name": "Kevin Zhang",
        "rating": 5,
        "comment": "Hyper-fast scroll wheel flies through thousand-line log files effortlessly."
      }
    ]
  },
  {
    "name": "MacBook Air M2 13.6-inch Silver",
    "image": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    "description": "Ultra-thin fanless portable workstation powered by the M2 chip, delivering up to 18 hours of battery life and MagSafe 3 fast charging.",
    "brand": "Apple",
    "category": "Computers",
    "price": 1199.99,
    "countInStock": 12,
    "rating": 4.7,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Lucas Meyer",
        "rating": 5,
        "comment": "Light enough to carry everywhere and easily runs full-stack Node and React builds."
      },
      {
        "name": "Emma Watson",
        "rating": 5,
        "comment": "Completely silent fanless design and the battery genuinely lasts two full workdays."
      },
      {
        "name": "Sophia Martinez",
        "rating": 4,
        "comment": "Best portable machine for frontend engineering and remote travel."
      }
    ]
  },
  {
    "name": "Apple AirPods Pro (2nd Gen, USB-C)",
    "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80",
    "description": "Active Noise Cancellation, Adaptive Transparency, and seamless instant switching between MacBook and iPhone.",
    "brand": "Apple",
    "category": "Audio",
    "price": 249,
    "countInStock": 30,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Jason Bourne",
        "rating": 5,
        "comment": "Adaptive audio mode is great when working from busy coffee shops."
      },
      {
        "name": "Sophia Martinez",
        "rating": 5,
        "comment": "Instant device switching between macOS and iOS works without a single hiccup."
      },
      {
        "name": "Ethan Hunt",
        "rating": 5,
        "comment": "USB-C charging case lets me use the same cable as my MacBook and iPad."
      }
    ]
  },
  {
    "name": "Asus ROG Zephyrus G14 RTX Workstation",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    "description": "Compact 14-inch powerhouse featuring AMD Ryzen 9, NVIDIA RTX 4060 GPU, and a 165Hz ROG Nebula display for WebGL and AI workloads.",
    "brand": "Asus",
    "category": "Computers",
    "price": 1599.99,
    "countInStock": 0,
    "rating": 4.7,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Kevin Zhang",
        "rating": 5,
        "comment": "Compiles large C++ and Three.js shaders faster than most desktop rigs."
      },
      {
        "name": "Olivia Park",
        "rating": 5,
        "comment": "Incredible GPU performance packed into a portable 14-inch chassis."
      },
      {
        "name": "Victor Stone",
        "rating": 4,
        "comment": "Runs local CUDA and Docker workloads smoothly with great Linux support."
      }
    ]
  },
  {
    "name": "Apple iPad Pro 12.9-inch M2 Wi-Fi",
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    "description": "Driven by the M2 chip with a 120Hz ProMotion Mini-LED display and wireless Sidecar second-monitor support for Mac.",
    "brand": "Apple",
    "category": "Tablets",
    "price": 1099.99,
    "countInStock": 7,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Daniel Craig",
        "rating": 5,
        "comment": "Doubles as a wireless second display for my MacBook when traveling."
      },
      {
        "name": "Grace Hopper",
        "rating": 5,
        "comment": "Whiteboarding system architecture diagrams with Apple Pencil feels natural."
      },
      {
        "name": "Chloe Bennett",
        "rating": 5,
        "comment": "Mini-LED contrast is stunning for reviewing UI/UX prototypes."
      }
    ]
  },
  {
    "name": "Apple Watch Series 9 Midnight 45mm",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    "description": "Sleek midnight aluminum smartwatch featuring the S9 SiP chip, Always-On Retina display, Pomodoro focus alerts, and workout tracking.",
    "brand": "Apple",
    "category": "Wearables",
    "price": 429,
    "countInStock": 14,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Ethan Hunt",
        "rating": 5,
        "comment": "Bright Always-On screen and seamless macOS Auto Unlock integration."
      },
      {
        "name": "Mia Wallace",
        "rating": 5,
        "comment": "Great for Pomodoro focus timers and stand reminders during long sprints."
      },
      {
        "name": "Lucas Meyer",
        "rating": 5,
        "comment": "Lightweight fluoroelastomer sport band is super comfortable while typing."
      }
    ]
  },
  {
    "name": "Rode PodMic Studio Broadcast Microphone",
    "image": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
    "description": "Broadcast-grade dynamic cardioid microphone on studio boom arm, delivering rich vocal clarity while rejecting mechanical keyboard noise.",
    "brand": "Rode",
    "category": "Audio",
    "price": 199,
    "countInStock": 4,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Chris Evans",
        "rating": 5,
        "comment": "Rejects mechanical keyboard clatter completely while keeping vocals warm."
      },
      {
        "name": "Natalie Portman",
        "rating": 5,
        "comment": "Studio-grade audio quality for tech podcasting and engineering demos."
      },
      {
        "name": "Alex Rivera",
        "rating": 5,
        "comment": "All-metal construction and internal pop filter make remote calls crystal clear."
      }
    ]
  },
  {
    "name": "Acer Nitro XV282K 28-inch 4K UHD IPS Monitor",
    "image": "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&q=80",
    "description": "28-inch 4K UHD Agile-Splendor IPS monitor with HDMI 2.1, USB-C 65W power delivery, ultra-thin zero-frame bezels, and Eyesafe certification.",
    "brand": "Acer",
    "category": "Monitors",
    "price": 549,
    "countInStock": 2,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Victor Stone",
        "rating": 5,
        "comment": "Crisp 4K text clarity and ultra-thin Acer bezels make multi-window coding effortless."
      },
      {
        "name": "Diana Prince",
        "rating": 5,
        "comment": "Vibrant IPS color gamut and ergonomic stand fit my tablet right underneath."
      },
      {
        "name": "Sarah Chen",
        "rating": 5,
        "comment": "Low blue light mode prevents eye strain during late-night debugging."
      }
    ]
  },
  {
    "name": "Razer Blade 16 Dual-Mode Mini-LED",
    "image": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
    "description": "Anodized CNC aluminum workstation with NVIDIA RTX 4080 and a switchable UHD+ 120Hz / FHD+ 240Hz Mini-LED display.",
    "brand": "Razer",
    "category": "Computers",
    "price": 3499.99,
    "countInStock": 5,
    "rating": 4.7,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Bruce Wayne",
        "rating": 5,
        "comment": "Unibody aluminum build quality feels rock solid under heavy GPU loads."
      },
      {
        "name": "Clark Kent",
        "rating": 5,
        "comment": "Switching between 4K productivity mode and high-refresh mode is seamless."
      },
      {
        "name": "Barry Allen",
        "rating": 4,
        "comment": "Handles Unreal Engine 5 and 3D web graphics without breaking a sweat."
      }
    ]
  },
  {
    "name": "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    "description": "Flagship over-ear wireless headphones with Dual Noise Sensor technology, LDAC high-resolution audio, 30-hour battery life, and speak-to-chat detection.",
    "brand": "Sony",
    "category": "Audio",
    "price": 348,
    "countInStock": 20,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Peter Parker",
        "rating": 5,
        "comment": "Zero clamping pressure even when wearing glasses for 8 hours straight."
      },
      {
        "name": "Gwen Stacy",
        "rating": 5,
        "comment": " Sony active noise cancellation completely silences background noise while coding."
      },
      {
        "name": "Faruk Aydin",
        "rating": 5,
        "comment": "Plush ear cushions, foldable design, and seamless multipoint Bluetooth switching."
      }
    ]
  },
  {
    "name": "Apple Magic Keyboard with Touch ID",
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    "description": "Low-profile wireless scissor-switch keyboard with integrated Touch ID sensor for instant authentication in clamshell mode.",
    "brand": "Apple",
    "category": "Accessories",
    "price": 149,
    "countInStock": 18,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Tony Stark",
        "rating": 5,
        "comment": "Touch ID on the external keyboard makes sudo terminal prompts effortless."
      },
      {
        "name": "Pepper Potts",
        "rating": 5,
        "comment": "Battery lasts over a month on a single charge and pairs instantly."
      },
      {
        "name": "Noah Patel",
        "rating": 5,
        "comment": "Essential accessory when using a MacBook Pro closed on a vertical stand."
      }
    ]
  },
  {
    "name": "Apple Studio Display 27-inch 5K Retina",
    "image": "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=800&q=80",
    "description": "27-inch 5K Retina studio monitor with 600 nits brightness, P3 wide color, 12MP Center Stage camera, and three USB-C ports.",
    "brand": "Apple",
    "category": "Monitors",
    "price": 1599,
    "countInStock": 8,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Steve Rogers",
        "rating": 5,
        "comment": "Single Thunderbolt cable powers my MacBook and drives 5K resolution."
      },
      {
        "name": "Peggy Carter",
        "rating": 5,
        "comment": "Built-in speakers and studio mic array are amazing for engineering calls."
      },
      {
        "name": "Hannah Abbott",
        "rating": 5,
        "comment": "Instant wake from sleep when connected to macOS workstations."
      }
    ]
  },
  {
    "name": "Garmin Fenix 7X Pro Sapphire Solar",
    "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
    "description": "Multisport GPS smartwatch with solar charging sapphire lens, HRV recovery tracking, and 28-day battery life.",
    "brand": "Garmin",
    "category": "Wearables",
    "price": 899.99,
    "countInStock": 9,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Clint Barton",
        "rating": 5,
        "comment": "Only charging once a month is a game changer compared to daily smartwatches."
      },
      {
        "name": "Wanda Maximoff",
        "rating": 5,
        "comment": "Sleep and HRV recovery metrics are spot-on after late-night deployments."
      },
      {
        "name": "Ryan Foster",
        "rating": 5,
        "comment": "Built-in LED flashlight and rugged bezel are super practical."
      }
    ]
  },
  {
    "name": "Apple iPad Air M1 10.9-inch",
    "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80",
    "description": "Powered by the Apple M1 chip with a 10.9-inch Liquid Retina display, ideal for technical reading and API documentation.",
    "brand": "Apple",
    "category": "Tablets",
    "price": 599,
    "countInStock": 6,
    "rating": 4.7,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Scott Lang",
        "rating": 5,
        "comment": "Perfect size for reading OReilly engineering books and reviewing PRs on the couch."
      },
      {
        "name": "Hope Pym",
        "rating": 5,
        "comment": "M1 chip keeps everything snappy and USB-C connects directly to my monitor."
      },
      {
        "name": "Elena Rostova",
        "rating": 4,
        "comment": "Great battery life for sketching UI wireframes and system flows."
      }
    ]
  },
  {
    "name": "Apple iMac 24-inch M3 Desktop Bundle",
    "image": "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=800&q=80",
    "description": "Complete Apple desktop workstation featuring a Retina display, wireless Magic Keyboard, and Magic Trackpad for clean developer setups.",
    "brand": "Apple",
    "category": "Computers",
    "price": 1499,
    "countInStock": 2,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Stephen Strange",
        "rating": 5,
        "comment": "Minimalist footprint on my wooden desk with zero cable mess."
      },
      {
        "name": "Christine Palmer",
        "rating": 5,
        "comment": "Retina display color calibration is spot on for frontend UI work."
      },
      {
        "name": "Liam OConnor",
        "rating": 5,
        "comment": "Whisper-quiet operation even with 30 browser tabs and Docker running."
      }
    ]
  },
  {
    "name": "Lumix G9 Pro 4K Mirrorless Studio Camera",
    "image": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80",
    "description": "Professional Lumix mirrorless camera with Leica DG lens, 4K 60p clean HDMI/USB streaming output, top status LCD, and 5-axis Dual I.S. 2 stabilization.",
    "brand": "Lumix",
    "category": "Accessories",
    "price": 1299,
    "countInStock": 22,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Arthur Curry",
        "rating": 5,
        "comment": "Makes my developer YouTube tutorials and conference talks look cinema-grade."
      },
      {
        "name": "Mera Nereus",
        "rating": 5,
        "comment": "Clean HDMI output works seamlessly as an ultra-sharp 4K studio webcam."
      },
      {
        "name": "Faruk Aydin",
        "rating": 5,
        "comment": "Lumix color science and Leica lens sharpness are unmatched for studio recording."
      }
    ]
  },
  {
    "name": "Thermaltake ROG Strix Liquid-Cooled RTX 4090 PC",
    "image": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    "description": "Flagship custom desktop workstation featuring Thermaltake ARGB liquid cooling, ASUS ROG Strix motherboard, G.Skill Trident Z RGB DDR5, and MSI RTX 4090.",
    "brand": "Thermaltake",
    "category": "Computers",
    "price": 3899,
    "countInStock": 3,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Barry Allen",
        "rating": 5,
        "comment": "Thermaltake AIO cooler keeps the CPU under 60C during heavy CUDA and LLM training."
      },
      {
        "name": "Iris West",
        "rating": 5,
        "comment": "ROG Strix motherboard and Trident Z DDR5 RAM deliver rock-solid stability."
      },
      {
        "name": "Kevin Zhang",
        "rating": 5,
        "comment": "24GB VRAM on the RTX 4090 crushes 3D rendering and local AI inference."
      }
    ]
  },
  {
    "name": "MacBook Pro 16-inch M3 Max Developer Edition",
    "image": "https://images.unsplash.com/photo-1514826786317-59744fe2a548?w=800&q=80",
    "description": "16-inch flagship portable workstation with 64GB unified memory, 2TB NVMe SSD, and 22-hour battery life for enterprise software architecture.",
    "brand": "Apple",
    "category": "Computers",
    "price": 3499,
    "countInStock": 15,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Hal Jordan",
        "rating": 5,
        "comment": "64GB unified memory runs Kubernetes clusters and Android emulators effortlessly."
      },
      {
        "name": "Carol Ferris",
        "rating": 5,
        "comment": "Expansive 16-inch screen feels like a desktop monitor on the go."
      },
      {
        "name": "Noah Patel",
        "rating": 5,
        "comment": "Best build quality and keyboard feel of any workstation laptop."
      }
    ]
  },
  {
    "name": "Dell UltraSharp 34-inch Curved Ultrawide Monitor",
    "image": "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&q=80",
    "description": "34-inch curved WQHD (3440x1440) IPS ultrawide monitor with integrated 90W USB-C hub, RJ45 Ethernet, and dual-PC KVM switch.",
    "brand": "Dell",
    "category": "Monitors",
    "price": 899.99,
    "countInStock": 4,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Matt Murdock",
        "rating": 5,
        "comment": "Ultrawide curved canvas lets me view three full-height code files simultaneously."
      },
      {
        "name": "Karen Page",
        "rating": 5,
        "comment": "Single USB-C cable charges my laptop and connects all desk peripherals."
      },
      {
        "name": "Sarah Chen",
        "rating": 5,
        "comment": "Picture-by-Picture mode is great when testing across macOS and Linux."
      }
    ]
  },
  {
    "name": "Logitech G203 Lightsync RGB Precision Mouse",
    "image": "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&q=80",
    "description": "Classic 6-button wired developer and gaming mouse featuring an 8,000 DPI optical sensor, customizable RGB G-logo lighting, and mechanical spring button tensioning.",
    "brand": "Logitech",
    "category": "Accessories",
    "price": 49,
    "countInStock": 34,
    "rating": 5,
    "numReviews": 3,
    "reviews": [
      {
        "name": "Nick Fury",
        "rating": 5,
        "comment": "Zero wireless interference, crisp button tensioning, and 1000Hz polling rate."
      },
      {
        "name": "Maria Hill",
        "rating": 5,
        "comment": "Lightweight 85g body and programmable side buttons for IDE navigation."
      },
      {
        "name": "Emma Watson",
        "rating": 5,
        "comment": "Unbeatable accuracy and durability for the price."
      }
    ]
  }
];

export default products;
