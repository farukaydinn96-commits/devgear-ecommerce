const makeProduct = (_id, legacyName, name, brand, category, price, countInStock, image, description, reviews) => {
  const avg = reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length;
  return {
    _id,
    legacyName,
    name,
    brand,
    category,
    price,
    countInStock,
    rating: Number(avg.toFixed(1)),
    numReviews: reviews.length,
    image,
    description,
    reviews
  };
};

export const INITIAL_PRODUCTS = [
  makeProduct(
    'devgear-p1',
    'MacBook Pro M3 Max 14-inch',
    'MacBook Pro M3 Max 14-inch',
    'Apple',
    'Computers',
    3199.99,
    10,
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    'The ultimate 14-inch laptop for professionals, featuring the Apple M3 Max chip, 36GB RAM, and 1TB SSD with Liquid Retina XDR display.',
    [
      { name: 'Alex Rivera', rating: 5, comment: 'Handles multiple Docker containers and local LLM builds completely silently.', createdAt: '2026-10-18' },
      { name: 'Sarah Chen', rating: 5, comment: 'The XDR display sharpness and 18-hour battery life are unmatched for coding.', createdAt: '2026-10-29' },
      { name: 'Faruk Aydin', rating: 5, comment: 'Zero thermal throttling during heavy full-stack TypeScript and WebGL builds.', createdAt: '2026-11-05' }
    ]
  ),
  makeProduct(
    'devgear-p2',
    'Sony WH-1000XM5 Noise Cancelling',
    'Sony WH-1000XM5 Wireless ANC Headphones',
    'Sony',
    'Audio',
    398.99,
    15,
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    'Industry-leading active noise cancellation, 30 hours of battery life, and crystal-clear microphone array for remote stand-ups.',
    [
      { name: 'David Kim', rating: 5, comment: 'Blocks out open-office chatter completely. Best investment for deep work sessions.', createdAt: '2026-10-19' },
      { name: 'Elena Rostova', rating: 5, comment: 'Super lightweight ear cups and crystal clear voice quality on daily Zoom calls.', createdAt: '2026-11-01' },
      { name: 'Marcus Vance', rating: 4, comment: 'Multipoint Bluetooth pairing switches smoothly between my MacBook and phone.', createdAt: '2026-11-06' }
    ]
  ),
  makeProduct(
    'devgear-p3',
    'Keychron Q1 Pro Mechanical Keyboard',
    'Keychron Q1 Pro Custom Mechanical Keyboard',
    'Keychron',
    'Accessories',
    199.00,
    8,
    'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    '75% layout custom mechanical keyboard featuring a full CNC aluminum body, wireless Bluetooth, QMK/VIA support, and hot-swappable tactile switches.',
    [
      { name: 'Marcus Vance', rating: 5, comment: 'The gasket-mount typing feel and VIA macro customization are phenomenal.', createdAt: '2026-10-22' },
      { name: 'Liam OConnor', rating: 5, comment: 'Heavy CNC aluminum build stays planted on the desk. Best tactile switches out of the box.', createdAt: '2026-11-03' },
      { name: 'Faruk Aydin', rating: 5, comment: 'Programmed custom Git and terminal shortcuts directly into layer 2 via VIA.', createdAt: '2026-11-09' }
    ]
  ),
  makeProduct(
    'devgear-p4',
    'Apple Studio Display 27-inch',
    'Apple iMac 27-inch 5K Retina All-in-One',
    'Apple',
    'Computers',
    1799.00,
    5,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    'Iconic 27-inch 5K Retina all-in-one desktop workstation featuring 500 nits brightness, P3 wide color gamut, and Magic Keyboard bundle.',
    [
      { name: 'Noah Patel', rating: 5, comment: 'Text rendering in VS Code and terminal windows is razor sharp on the 5K panel.', createdAt: '2026-10-11' },
      { name: 'Chloe Bennett', rating: 5, comment: 'Clean all-in-one aluminum footprint keeps my engineering desk clutter-free.', createdAt: '2026-10-25' },
      { name: 'Daniel Craig', rating: 5, comment: '5K resolution easily fits side-by-side code editors and browser DevTools.', createdAt: '2026-11-04' }
    ]
  ),
  makeProduct(
    'devgear-p5',
    'Apple Magic Trackpad',
    'Logitech M720 Triathlon Wireless Mouse',
    'Logitech',
    'Accessories',
    69.00,
    25,
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    'Contoured wireless developer mouse featuring hyper-fast dual-mode scroll wheel, Easy-Switch pairing for up to 3 computers, and 24-month battery life.',
    [
      { name: 'Ryan Foster', rating: 5, comment: 'Switches between my work MacBook and Linux desktop with a single thumb button.', createdAt: '2026-10-20' },
      { name: 'Hannah Abbott', rating: 5, comment: 'Ergonomic sculpted grip eliminated my wrist fatigue during long coding sprints.', createdAt: '2026-11-02' },
      { name: 'Kevin Zhang', rating: 5, comment: 'Hyper-fast scroll wheel flies through thousand-line log files effortlessly.', createdAt: '2026-11-08' }
    ]
  ),
  makeProduct(
    'devgear-p6',
    'MacBook Air M2 13.6-inch Midnight',
    'MacBook Air M2 13.6-inch Silver',
    'Apple',
    'Computers',
    1199.99,
    12,
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    'Ultra-thin fanless portable workstation powered by the M2 chip, delivering up to 18 hours of battery life and MagSafe 3 fast charging.',
    [
      { name: 'Lucas Meyer', rating: 5, comment: 'Light enough to carry everywhere and easily runs full-stack Node and React builds.', createdAt: '2026-10-30' },
      { name: 'Emma Watson', rating: 5, comment: 'Completely silent fanless design and the battery genuinely lasts two full workdays.', createdAt: '2026-11-04' },
      { name: 'Sophia Martinez', rating: 4, comment: 'Best portable machine for frontend engineering and remote travel.', createdAt: '2026-11-07' }
    ]
  ),
  makeProduct(
    'devgear-p7',
    'Apple AirPods Pro (2nd Gen)',
    'Apple AirPods Pro (2nd Gen, USB-C)',
    'Apple',
    'Audio',
    249.00,
    30,
    'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
    'Active Noise Cancellation, Adaptive Transparency, and seamless instant switching between MacBook and iPhone.',
    [
      { name: 'Jason Bourne', rating: 5, comment: 'Adaptive audio mode is great when working from busy coffee shops.', createdAt: '2026-10-28' },
      { name: 'Sophia Martinez', rating: 5, comment: 'Instant device switching between macOS and iOS works without a single hiccup.', createdAt: '2026-11-03' },
      { name: 'Ethan Hunt', rating: 5, comment: 'USB-C charging case lets me use the same cable as my MacBook and iPad.', createdAt: '2026-11-09' }
    ]
  ),
  makeProduct(
    'devgear-p8',
    'Asus ROG Zephyrus G14 Gaming',
    'Asus ROG Zephyrus G14 RTX Workstation',
    'Asus',
    'Computers',
    1599.99,
    0,
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    'Compact 14-inch powerhouse featuring AMD Ryzen 9, NVIDIA RTX 4060 GPU, and a 165Hz ROG Nebula display for WebGL and AI workloads.',
    [
      { name: 'Kevin Zhang', rating: 5, comment: 'Compiles large C++ and Three.js shaders faster than most desktop rigs.', createdAt: '2026-10-18' },
      { name: 'Olivia Park', rating: 5, comment: 'Incredible GPU performance packed into a portable 14-inch chassis.', createdAt: '2026-10-29' },
      { name: 'Victor Stone', rating: 4, comment: 'Runs local CUDA and Docker workloads smoothly with great Linux support.', createdAt: '2026-11-05' }
    ]
  ),
  makeProduct(
    'devgear-p9',
    'iPad Pro 12.9-inch M2',
    'Apple iPad Pro 12.9-inch M2 Wi-Fi',
    'Apple',
    'Tablets',
    1099.99,
    7,
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    'Driven by the M2 chip with a 120Hz ProMotion Mini-LED display and wireless Sidecar second-monitor support for Mac.',
    [
      { name: 'Daniel Craig', rating: 5, comment: 'Doubles as a wireless second display for my MacBook when traveling.', createdAt: '2026-10-25' },
      { name: 'Grace Hopper', rating: 5, comment: 'Whiteboarding system architecture diagrams with Apple Pencil feels natural.', createdAt: '2026-11-02' },
      { name: 'Chloe Bennett', rating: 5, comment: 'Mini-LED contrast is stunning for reviewing UI/UX prototypes.', createdAt: '2026-11-08' }
    ]
  ),
  makeProduct(
    'devgear-p10',
    'Apple Watch Ultra 2 Titanium',
    'Apple Watch Series 9 Midnight 45mm',
    'Apple',
    'Wearables',
    429.00,
    14,
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    'Sleek midnight aluminum smartwatch featuring the S9 SiP chip, Always-On Retina display, Pomodoro focus alerts, and workout tracking.',
    [
      { name: 'Ethan Hunt', rating: 5, comment: 'Bright Always-On screen and seamless macOS Auto Unlock integration.', createdAt: '2026-10-12' },
      { name: 'Mia Wallace', rating: 5, comment: 'Great for Pomodoro focus timers and stand reminders during long sprints.', createdAt: '2026-10-27' },
      { name: 'Lucas Meyer', rating: 5, comment: 'Lightweight fluoroelastomer sport band is super comfortable while typing.', createdAt: '2026-11-06' }
    ]
  ),
  makeProduct(
    'devgear-p11',
    'Shure SM7B Broadcast Microphone',
    'Rode PodMic Studio Broadcast Microphone',
    'Rode',
    'Audio',
    199.00,
    4,
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    'Broadcast-grade dynamic cardioid microphone on studio boom arm, delivering rich vocal clarity while rejecting mechanical keyboard noise.',
    [
      { name: 'Chris Evans', rating: 5, comment: 'Rejects mechanical keyboard clatter completely while keeping vocals warm.', createdAt: '2026-10-29' },
      { name: 'Natalie Portman', rating: 5, comment: 'Studio-grade audio quality for tech podcasting and engineering demos.', createdAt: '2026-11-04' },
      { name: 'Alex Rivera', rating: 5, comment: 'All-metal construction and internal pop filter make remote calls crystal clear.', createdAt: '2026-11-10' }
    ]
  ),
  makeProduct(
    'devgear-p12',
    'Apple Pro Display XDR 32-inch',
    'Acer Nitro XV282K 28-inch 4K UHD IPS Monitor',
    'Acer',
    'Monitors',
    549.00,
    2,
    'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&q=80',
    '28-inch 4K UHD Agile-Splendor IPS monitor with HDMI 2.1, USB-C 65W power delivery, ultra-thin zero-frame bezels, and Eyesafe certification.',
    [
      { name: 'Victor Stone', rating: 5, comment: 'Crisp 4K text clarity and ultra-thin Acer bezels make multi-window coding effortless.', createdAt: '2026-10-08' },
      { name: 'Diana Prince', rating: 5, comment: 'Vibrant IPS color gamut and ergonomic stand fit my tablet right underneath.', createdAt: '2026-10-24' },
      { name: 'Sarah Chen', rating: 5, comment: 'Low blue light mode prevents eye strain during late-night debugging.', createdAt: '2026-11-03' }
    ]
  ),
  makeProduct(
    'devgear-p13',
    'Razer Blade 16 Gaming Laptop',
    'Razer Blade 16 Dual-Mode Mini-LED',
    'Razer',
    'Computers',
    3499.99,
    5,
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
    'Anodized CNC aluminum workstation with NVIDIA RTX 4080 and a switchable UHD+ 120Hz / FHD+ 240Hz Mini-LED display.',
    [
      { name: 'Bruce Wayne', rating: 5, comment: 'Unibody aluminum build quality feels rock solid under heavy GPU loads.', createdAt: '2026-10-20' },
      { name: 'Clark Kent', rating: 5, comment: 'Switching between 4K productivity mode and high-refresh mode is seamless.', createdAt: '2026-11-01' },
      { name: 'Barry Allen', rating: 4, comment: 'Handles Unreal Engine 5 and 3D web graphics without breaking a sweat.', createdAt: '2026-11-07' }
    ]
  ),
  makeProduct(
    'devgear-p14',
    'Bose QuietComfort Ultra',
    'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    'Sony',
    'Audio',
    348.00,
    20,
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    'Flagship over-ear wireless headphones with Dual Noise Sensor technology, LDAC high-resolution audio, 30-hour battery life, and speak-to-chat detection.',
    [
      { name: 'Peter Parker', rating: 5, comment: 'Zero clamping pressure even when wearing glasses for 8 hours straight.', createdAt: '2026-10-21' },
      { name: 'Gwen Stacy', rating: 5, comment: ' Sony active noise cancellation completely silences background noise while coding.', createdAt: '2026-11-04' },
      { name: 'Faruk Aydin', rating: 5, comment: 'Plush ear cushions, foldable design, and seamless multipoint Bluetooth switching.', createdAt: '2026-11-09' }
    ]
  ),
  makeProduct(
    'devgear-p15',
    'Apple Magic Keyboard',
    'Apple Magic Keyboard with Touch ID',
    'Apple',
    'Accessories',
    149.00,
    18,
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    'Low-profile wireless scissor-switch keyboard with integrated Touch ID sensor for instant authentication in clamshell mode.',
    [
      { name: 'Tony Stark', rating: 5, comment: 'Touch ID on the external keyboard makes sudo terminal prompts effortless.', createdAt: '2026-10-16' },
      { name: 'Pepper Potts', rating: 5, comment: 'Battery lasts over a month on a single charge and pairs instantly.', createdAt: '2026-10-31' },
      { name: 'Noah Patel', rating: 5, comment: 'Essential accessory when using a MacBook Pro closed on a vertical stand.', createdAt: '2026-11-06' }
    ]
  ),
  makeProduct(
    'devgear-p16',
    'Apple iMac 24-inch M3 Silver',
    'Apple Studio Display 27-inch 5K Retina',
    'Apple',
    'Monitors',
    1599.00,
    8,
    'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=800&q=80',
    '27-inch 5K Retina studio monitor with 600 nits brightness, P3 wide color, 12MP Center Stage camera, and three USB-C ports.',
    [
      { name: 'Steve Rogers', rating: 5, comment: 'Single Thunderbolt cable powers my MacBook and drives 5K resolution.', createdAt: '2026-10-21' },
      { name: 'Peggy Carter', rating: 5, comment: 'Built-in speakers and studio mic array are amazing for engineering calls.', createdAt: '2026-11-02' },
      { name: 'Hannah Abbott', rating: 5, comment: 'Instant wake from sleep when connected to macOS workstations.', createdAt: '2026-11-08' }
    ]
  ),
  makeProduct(
    'devgear-p17',
    'Garmin Fenix 7X Pro Sapphire',
    'Garmin Fenix 7X Pro Sapphire Solar',
    'Garmin',
    'Wearables',
    899.99,
    9,
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    'Multisport GPS smartwatch with solar charging sapphire lens, HRV recovery tracking, and 28-day battery life.',
    [
      { name: 'Clint Barton', rating: 5, comment: 'Only charging once a month is a game changer compared to daily smartwatches.', createdAt: '2026-10-27' },
      { name: 'Wanda Maximoff', rating: 5, comment: 'Sleep and HRV recovery metrics are spot-on after late-night deployments.', createdAt: '2026-11-03' },
      { name: 'Ryan Foster', rating: 5, comment: 'Built-in LED flashlight and rugged bezel are super practical.', createdAt: '2026-11-09' }
    ]
  ),
  makeProduct(
    'devgear-p18',
    'Apple iPad Air M1 10.9-inch',
    'Apple iPad Air M1 10.9-inch',
    'Apple',
    'Tablets',
    599.00,
    6,
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80',
    'Powered by the Apple M1 chip with a 10.9-inch Liquid Retina display, ideal for technical reading and API documentation.',
    [
      { name: 'Scott Lang', rating: 5, comment: 'Perfect size for reading OReilly engineering books and reviewing PRs on the couch.', createdAt: '2026-10-15' },
      { name: 'Hope Pym', rating: 5, comment: 'M1 chip keeps everything snappy and USB-C connects directly to my monitor.', createdAt: '2026-10-29' },
      { name: 'Elena Rostova', rating: 4, comment: 'Great battery life for sketching UI wireframes and system flows.', createdAt: '2026-11-05' }
    ]
  ),
  makeProduct(
    'devgear-p19',
    'Mac Studio M2 Ultra',
    'Apple iMac 24-inch M3 Desktop Bundle',
    'Apple',
    'Computers',
    1499.00,
    2,
    'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=800&q=80',
    'Complete Apple desktop workstation featuring a Retina display, wireless Magic Keyboard, and Magic Trackpad for clean developer setups.',
    [
      { name: 'Stephen Strange', rating: 5, comment: 'Minimalist footprint on my wooden desk with zero cable mess.', createdAt: '2026-11-01' },
      { name: 'Christine Palmer', rating: 5, comment: 'Retina display color calibration is spot on for frontend UI work.', createdAt: '2026-11-04' },
      { name: 'Liam OConnor', rating: 5, comment: 'Whisper-quiet operation even with 30 browser tabs and Docker running.', createdAt: '2026-11-10' }
    ]
  ),
  makeProduct(
    'devgear-p20',
    'Elgato Stream Deck MK.2',
    'Lumix G9 Pro 4K Mirrorless Studio Camera',
    'Lumix',
    'Accessories',
    1299.00,
    22,
    'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80',
    'Professional Lumix mirrorless camera with Leica DG lens, 4K 60p clean HDMI/USB streaming output, top status LCD, and 5-axis Dual I.S. 2 stabilization.',
    [
      { name: 'Arthur Curry', rating: 5, comment: 'Makes my developer YouTube tutorials and conference talks look cinema-grade.', createdAt: '2026-10-24' },
      { name: 'Mera Nereus', rating: 5, comment: 'Clean HDMI output works seamlessly as an ultra-sharp 4K studio webcam.', createdAt: '2026-11-02' },
      { name: 'Faruk Aydin', rating: 5, comment: 'Lumix color science and Leica lens sharpness are unmatched for studio recording.', createdAt: '2026-11-08' }
    ]
  ),
  makeProduct(
    'devgear-p21',
    'NZXT Player: Three Prime PC',
    'Thermaltake ROG Strix Liquid-Cooled RTX 4090 PC',
    'Thermaltake',
    'Computers',
    3899.00,
    3,
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80',
    'Flagship custom desktop workstation featuring Thermaltake ARGB liquid cooling, ASUS ROG Strix motherboard, G.Skill Trident Z RGB DDR5, and MSI RTX 4090.',
    [
      { name: 'Barry Allen', rating: 5, comment: 'Thermaltake AIO cooler keeps the CPU under 60C during heavy CUDA and LLM training.', createdAt: '2026-10-19' },
      { name: 'Iris West', rating: 5, comment: 'ROG Strix motherboard and Trident Z DDR5 RAM deliver rock-solid stability.', createdAt: '2026-11-01' },
      { name: 'Kevin Zhang', rating: 5, comment: '24GB VRAM on the RTX 4090 crushes 3D rendering and local AI inference.', createdAt: '2026-11-07' }
    ]
  ),
  makeProduct(
    'devgear-p22',
    'Apple Mac mini M2 Pro',
    'MacBook Pro 16-inch M3 Max Developer Edition',
    'Apple',
    'Computers',
    3499.00,
    15,
    'https://images.unsplash.com/photo-1514826786317-59744fe2a548?w=800&q=80',
    '16-inch flagship portable workstation with 64GB unified memory, 2TB NVMe SSD, and 22-hour battery life for enterprise software architecture.',
    [
      { name: 'Hal Jordan', rating: 5, comment: '64GB unified memory runs Kubernetes clusters and Android emulators effortlessly.', createdAt: '2026-10-26' },
      { name: 'Carol Ferris', rating: 5, comment: 'Expansive 16-inch screen feels like a desktop monitor on the go.', createdAt: '2026-11-03' },
      { name: 'Noah Patel', rating: 5, comment: 'Best build quality and keyboard feel of any workstation laptop.', createdAt: '2026-11-09' }
    ]
  ),
  makeProduct(
    'devgear-p23',
    'Microsoft Surface Studio 2+',
    'Dell UltraSharp 34-inch Curved Ultrawide Monitor',
    'Dell',
    'Monitors',
    899.99,
    4,
    'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&q=80',
    '34-inch curved WQHD (3440x1440) IPS ultrawide monitor with integrated 90W USB-C hub, RJ45 Ethernet, and dual-PC KVM switch.',
    [
      { name: 'Matt Murdock', rating: 5, comment: 'Ultrawide curved canvas lets me view three full-height code files simultaneously.', createdAt: '2026-10-22' },
      { name: 'Karen Page', rating: 5, comment: 'Single USB-C cable charges my laptop and connects all desk peripherals.', createdAt: '2026-11-05' },
      { name: 'Sarah Chen', rating: 5, comment: 'Picture-by-Picture mode is great when testing across macOS and Linux.', createdAt: '2026-11-11' }
    ]
  ),
  makeProduct(
    'devgear-p24',
    'Apple Magic Mouse',
    'Logitech G203 Lightsync RGB Precision Mouse',
    'Logitech',
    'Accessories',
    49.00,
    34,
    'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&q=80',
    'Classic 6-button wired developer and gaming mouse featuring an 8,000 DPI optical sensor, customizable RGB G-logo lighting, and mechanical spring button tensioning.',
    [
      { name: 'Nick Fury', rating: 5, comment: 'Zero wireless interference, crisp button tensioning, and 1000Hz polling rate.', createdAt: '2026-10-17' },
      { name: 'Maria Hill', rating: 5, comment: 'Lightweight 85g body and programmable side buttons for IDE navigation.', createdAt: '2026-10-30' },
      { name: 'Emma Watson', rating: 5, comment: 'Unbeatable accuracy and durability for the price.', createdAt: '2026-11-07' }
    ]
  )
];

export const resolveProductData = (apiItem, fallbackIdx = 0) => {
  if (!apiItem) return INITIAL_PRODUCTS[fallbackIdx % INITIAL_PRODUCTS.length];

  const matched =
    INITIAL_PRODUCTS.find((p) => String(p._id) === String(apiItem._id)) ||
    INITIAL_PRODUCTS.find((p) => p.image === apiItem.image) ||
    INITIAL_PRODUCTS.find(
      (p) =>
        p.legacyName.toLowerCase() === (apiItem.name || '').toLowerCase() ||
        p.name.toLowerCase() === (apiItem.name || '').toLowerCase()
    ) ||
    INITIAL_PRODUCTS[fallbackIdx % INITIAL_PRODUCTS.length];

  const validReviews =
    Array.isArray(apiItem.reviews) &&
    apiItem.reviews.length >= 3 &&
    !apiItem.reviews.some((r) => /[ğüşıöçĞÜŞİÖÇ]/.test(r.comment || ''))
      ? apiItem.reviews
      : matched.reviews;

  const avgRating =
    validReviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / validReviews.length;

  return {
    ...matched,
    _id: apiItem._id || matched._id,
    countInStock: apiItem.countInStock !== undefined ? apiItem.countInStock : matched.countInStock,
    name: matched.name,
    brand: matched.brand,
    category: matched.category,
    price: matched.price,
    image: matched.image,
    description: matched.description,
    reviews: validReviews,
    numReviews: validReviews.length,
    rating: Number(avgRating.toFixed(1))
  };
};
