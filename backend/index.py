import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows your React frontend to make requests to this backend

def generate_heatmap_image(fig):
    """Convert matplotlib figure to base64 encoded image"""
    buffer = BytesIO()
    fig.savefig(buffer, format='png', bbox_inches='tight')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    encoded = base64.b64encode(image_png).decode('utf-8')
    return encoded

@app.route('/api/heatmaps', methods=['GET'])
def get_heatmaps():
    # Heat Map 1 Data
    data1 = {
        'Code': ['OrG', 'BiZ', 'CoM', 'PeM', 'FiA', 'VeA', 'ReM', 'PrM', 'CmA', 'RiA', 'Total'],
        'Category': ['Organization', 'Business Alignment', 'Contract Management', 'Performance Management',
                    'Financial Management', 'Vendor Alignment', 'Relationship Management', 'Project Management',
                    'Compliance Management', 'Risk Management', 'Total'],
        'Wt.': ['10%', '10%', '15%', '15%', '15%', '5%', '10%', '5%', '10%', '5%', '100%'],
        'Score': [5.3, 5.4, 5.4, 5.3, 4.95, 5.8, 4.55, 4.55, 5.9, 5.75, 5.27],
        'Average': [5.27] * 11
    }
    
    df1 = pd.DataFrame(data1)
    
    # Heat Map 2 Data
    data2 = {
        'Code': ['Organization', 'Process', 'Automation'],
        'OrG': [5.80, 5.25, 5.00],
        'BiZ': [5.25, 5.50, 5.50],
        'CoM': [5.00, 5.57, 5.00],
        'PeM': [5.25, 5.20, 5.00],
        'FiA': [6.50, 4.20, 2.00],
        'VeA': [6.00, 5.50, 5.00],
        'ReM': [4.33, 4.33, 7.00],
        'PrM': [4.75, 4.33, 5.00],
        'CmA': [5.00, 6.75, 7.00],
        'RiA': [5.67, 5.50, 6.00]
    }
    
    df2 = pd.DataFrame(data2)
    
    # Heat Map 3 Data
    data3 = {
        'Questions': ['Organization', 'Business Alignment', 'Contract Management',
                    'Performance Management', 'Financial Management',
                    'Vendor Alignment', 'Relationship Management',
                    'Project Management', 'Compliance Management',
                    'Risk Management'],
        'Q1': [2, 4, 6, 9, 4, 4, 6, 3, 7, 5],
        'Q2': [8, 5, 4, 5, 6, 7, 2, 6, 3, 5],
        'Q3': [4, 3, 6, 5, 5, 2, 4, 4, 3, 3],
        'Q4': [8, 4, 5, 7, 9, 6, 6, 7, 4, 7],
        'Q5': [3, 2, 4, 5, 6, 5, 3, 5, 9, 2],
        'Q6': [7, 6, 6, 2, 3, 5, 5, 4, 7, 4],
        'Q7': [5, 4, 7, 3, 4, 7, 5, 6, 9, 10],
        'Q8': [6, 9, 6, 6, 2, 9, 4, 6, 3, 4],
        'Q9': [4, 9, 5, 4, 4, 9, 4, 5, 7, 10],
        'Q10': [8, 8, 5, 6, 6, 7, 6, 1, 7, 6]
    }
    
    df3 = pd.DataFrame(data3)
    
    # Generate heatmap images
    images = []
    
    # Plot Heat Map for df1
    fig1 = plt.figure(figsize=(10, 8))
    sns.set(font_scale=1)
    sns.heatmap(df1[['Score']], annot=True, cmap="YlGnBu")
    plt.title('Heat Map - Score')
    images.append(generate_heatmap_image(fig1))
    plt.close(fig1)
    
    # Plot Heat Map for df2
    fig2 = plt.figure(figsize=(12, 8))
    sns.set(font_scale=1)
    sns.heatmap(df2.set_index('Code'), annot=True, cmap="YlGnBu")
    plt.title('Heat Map - Categories')
    images.append(generate_heatmap_image(fig2))
    plt.close(fig2)
    
    # Plot Heat Map for df3
    fig3 = plt.figure(figsize=(12, 8))
    sns.set(font_scale=1)
    sns.heatmap(df3.set_index('Questions'), annot=True, cmap="YlGnBu")
    plt.title('Heat Map - Questions')
    images.append(generate_heatmap_image(fig3))
    plt.close(fig3)
    
    # Also send the raw data for React to visualize directly
    response_data = {
        'images': images,
        'rawData': {
            'heatmap1': df1.to_dict(orient='records'),
            'heatmap2': df2.to_dict(orient='records'),
            'heatmap3': df3.to_dict(orient='records')
        }
    }
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=3001)





