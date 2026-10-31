const profile = {
  name: "John Harvey Puyong",
  title: "Content Creator & Web Developer",
  intro: "I've been creating content and managing my own social media accounts across multiple platforms for over 2 years. I've generated millions of views and grown an audience of hundreds of thousands of followers.",
  photo: "Assets/Resume-Profile-Pic-2.png", // replace with your own photo
  contactIntro: "Need help growing and managing your social media?",
  email: "puyongjohnharvey@gmail.com"
};

// platform: "tiktok" | "youtube" | "facebook"
const accounts = [
  { platform: "tiktok",   handle: "@Frontiend", avatar: "Assets/Frontiend-profile.jpeg", followers: "13.1k+", url: "https://www.tiktok.com/@frontiend" },
  { platform: "tiktok",   handle: "@meowish.dev", avatar: "Assets/Meowish profile.jpeg", followers: "152k+", url: "https://www.tiktok.com/@meowish.dev" },
  { platform: "facebook", handle: "@Frontiend.dev",    avatar: "Assets/Frontiend-profile.jpeg", followers: "11.5k+", url: "https://www.facebook.com/people/Frontienddev/61590651202388/?rdid=iUTaOgbSwGKLvfzH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F1rHARTte" },
  { platform: "facebook", handle: "@Yumzzy", avatar: "Assets/Yumzzy-profile.jpg", followers: "133", url: "https://www.facebook.com/share/19VU95Fh67/" },
  { platform: "instagram", handle: "@takagi.dev", avatar: "Assets/Frontiend-profile.jpeg", followers: "1.1k+", url: "https://www.instagram.com/takagi.dev?mdxt=MTJtNnVtNTg1dzR5bw==" },
  { platform: "youtube",  handle: "@Meowish", avatar: "Assets/Meowish-yt.jpg", followers: "9.4k+", url: "https://www.youtube.com/@zensei-xg4bw" }
];

const videos = [
  { platform: "tiktok",   title: "Interactive Reptile",   thumbnail: "Assets/interactive-reptile-Cover.jpg", views: "11.9M", url: "https://www.tiktok.com/@meowish.dev/video/7533931866181750034?is_from_webapp=1&sender_device=pc&web_id=7699395314142742037" },
  { platform: "tiktok",   title: "CSS Coding Meme",   thumbnail: "Assets/CSS-Coding-Meme-Thumbnail.jpg", views: "1.2M", url: "https://www.tiktok.com/@frontiend/video/7690579640125099272?is_from_webapp=1&sender_device=pc&web_id=7666691149067961877" },
  { platform: "tiktok",  title: "Interactive Dragon",  thumbnail: "Assets/Interactive-Dragon-Thumbnail.jpg", views: "3.6M", url: "https://www.tiktok.com/@meowish.dev/video/7427781630796025093?is_from_webapp=1&sender_device=pc&web_id=7699395314142742037" },
  { platform: "tiktok",  title: "Heart Animation",  thumbnail: "Assets/Heart-Particle-Thumbnail.jpg", views: "4.4M", url: "https://www.tiktok.com/@meowish.dev/video/7479008884133285141?is_from_webapp=1&sender_device=pc&web_id=7699395314142742037" },
  { platform: "tiktok",  title: "Interactive Whale",  thumbnail: "Assets/Interactive-Whale-Cover.jpg", views: "2.8M", url: "https://www.tiktok.com/@meowish.dev/video/7458606952403258631?is_from_webapp=1&sender_device=pc&web_id=7699395314142742037" },
  { platform: "tiktok",  title: "Pink Heart Particles",  thumbnail: "Assets/Interactive-Pink-Heart-Thumbnail.jpg", views: "1.6M", url: "https://www.tiktok.com/@meowish.dev/video/7547705901986123015?is_from_webapp=1&sender_device=pc&web_id=7699395314142742037" },
  { platform: "tiktok",  title: "Interactive Heart Particles",  thumbnail: "Assets/Interactive-Heart-ParticlesThumbnail.jpg", views: "1.6M", url: "https://www.tiktok.com/@meowish.dev/video/7468621105389931783?is_from_webapp=1&sender_device=pc&web_id=7699395314142742037" },
  { platform: "facebook", title: "How To Cheat Chrome Dino Game", thumbnail: "Assets/How-to-cheat-chrome-dino-game-Thumbnail.jpg", views: "1.7M", url: "https://www.facebook.com/share/r/19nJTH9uNm/" },
  { platform: "facebook",   title: "Flappy Div",   thumbnail: "Assets/Flappy-div-thumbnail.jpg", views: "1.5M", url: "https://www.facebook.com/share/r/1VTGEfrJvo/" },
  { platform: "facebook",  title: "Birthday Cake Animation",  thumbnail: "Assets/Birthday-Cake-Thumbnail.jpg", views: "935k", url: "https://www.facebook.com/share/r/1E3PHvhxo8/" },
  { platform: "facebook",  title: "Birthday Cake Animation 2",  thumbnail: "Assets/Birthday-Cake-2-Thumbnail.jpg", views: "821k", url: "https://www.facebook.com/share/r/19oJZnymBQ/" },
  { platform: "facebook", title: "Spiderman Code", thumbnail: "Assets/Spiderman-Code-Thumbnail.jpg", views: "485k", url: "https://www.facebook.com/share/r/1FjSJFF8wD/" },
  { platform: "tiktok",   title: "Blue Heart Particles",   thumbnail: "Assets/Blue-Heart-Particles-Thumbnail.jpg", views: "1M", url: "https://www.tiktok.com/@frontiend/video/7677889576668515592?is_from_webapp=1&sender_device=pc&web_id=7666691149067961877" },
  { platform: "youtube",   title: "Love Letter",   thumbnail: "Assets/Love-Letter-YT-Thumbnail-Cover.jpg", views: "366k", url: "https://youtube.com/shorts/ZbXGjbdh3qg?si=vppL-5MVnHh4cj4k" },
];

// icon: "community" | "analytics" | "design" (see SERVICE_ICONS in main.js)
const services = [
  {
    icon: "community",
    title: "Social Media Management & Community Engagement",
    description: "Managing social media accounts, scheduling posts, engaging with followers, responding to comments, and maintaining an active online presence."
  },
  {
    icon: "analytics",
    title: "Social Media Analytics & Reporting",
    description: "Monitoring content performance, tracking views, reach, and engagement, and preparing reports to help brands understand their social media results."
  },
  {
    icon: "design",
    title: "Thumbnail Design & Caption Writing",
    description: "Creating eye-catching thumbnails and writing engaging captions that align with the brand's message and target audience."
  }
];
