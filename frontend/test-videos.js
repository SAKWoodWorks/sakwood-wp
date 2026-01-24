// Test script to verify videos API and data flow
const API_URL = 'http://localhost:8006/wp-json/sakwood/v1/videos';

async function testVideos() {
  try {
    console.log('Testing Videos API...');

    const response = await fetch(`${API_URL}?language=th`);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (data && data.length > 0) {
      console.log('\n✅ Videos API is working!');
      console.log(`Found ${data.length} videos`);

      const firstVideo = data[0];
      console.log('\nFirst video structure:');
      console.log('- ID:', firstVideo.id);
      console.log('- Title:', firstVideo.title);
      console.log('- Category:', firstVideo.videoCategory);
      console.log('- Duration:', firstVideo.videoDuration);
      console.log('- Thumbnail URL:', firstVideo.thumbnailUrl);

      // Test property mapping used in components
      const mappedVideo = {
        id: firstVideo.id,
        title: firstVideo.title,
        description: firstVideo.description,
        videoCategory: firstVideo.videoCategory,
        videoDuration: firstVideo.videoDuration,
        thumbnailUrl: firstVideo.thumbnailUrl,
        videoType: firstVideo.videoType,
        videoId: firstVideo.videoId,
        views: firstVideo.views
      };

      console.log('\nMapped video object (matches VideoCard expectations):');
      console.log(JSON.stringify(mappedVideo, null, 2));

    } else {
      console.log('\n❌ No videos found');
    }

  } catch (error) {
    console.error('Error testing videos API:', error.message);
  }
}

testVideos();