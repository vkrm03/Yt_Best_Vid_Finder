from flask import Flask, request, jsonify
import re
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/videos', methods=['POST'])
def get_videos():
    try:
        data = request.get_json()
        url = data.get('playlistLink')
        print(url)

        if not url:
            return jsonify({'error': 'No playlist link provided'}), 400

        res = requests.get(url, headers={"User-Agent": "Defined"})
        text = res.text

        title_pattern = r'"title":{"runs":\[\{"text":"(.*?)"\}\]'
        views_pattern = r'(\d{1,3}(?:,\d{3})*) views'
        video_id_pattern = r'"playlistVideoRenderer":{"videoId":"(.*?)"'

        titles = re.findall(title_pattern, text)
        views = re.findall(views_pattern, text)
        video_ids = re.findall(video_id_pattern, text)

        video_data = []
        for i in range(len(titles) - 7):
            title = titles[i]
            view_count_str = views[i] if i < len(views) else "0 views"
            view_count = int(view_count_str.replace(',', '').split()[0])
            if i < len(video_ids):
                video_link = f"https://www.youtube.com/watch?v={video_ids[i]}"
            else:
                video_link = "Link not found"
            video_data.append({'title': title, 'views': view_count, 'link': video_link})

        sorted_video_data = sorted(video_data, key=lambda x: x['views'], reverse=True)

        video_count = len(sorted_video_data)

        return jsonify({'videoCount': video_count, 'videos': sorted_video_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
