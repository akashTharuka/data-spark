from flask import jsonify, request, send_file, make_response
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
from models.Review import Review
from models.User import User
from models.Dataset import Dataset
import os.path
from os import path

from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request, jwt_required

import pandas as pd
import os
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import json

def plot_histsmooth(df):
    sns.set()
    plt.gcf().clear()
    df.hist(figsize = (20,20))
    from io import BytesIO
    plt.xlabel('')
    plt.legend()
    figfile = BytesIO()
    plt.savefig(figfile, format='png')
    plt.close()
    figfile.seek(0)  # rewind to beginning of file
    import base64
    figdata_png = base64.b64encode(figfile.getvalue()).decode('utf8')
    return figdata_png #.decode('ascii')

class GetDatasetDetailsApiHandler(Resource):

    reviewed = False

    def get(self):

        dataset_id = request.args.get('id')
        dataset = Dataset.filter_by_id(dataset_id)

        title = dataset.title
        description = dataset.description
        fileType = dataset.file_type
        fileSize = dataset.file_size
        downloads = dataset.num_downloads
        avgRating = dataset.avg_rating
        uploadTime = dataset.upload_time
        category = dataset.category

        uploaderID = dataset.uploader_id
        uploader = User.find_by_id(uploaderID)

        uploaderName = uploader.username

        datasetDetails = {
            "id": dataset_id,
            "title": title,
            "description": description,
            "fileType": fileType,
            "fileSize": fileSize,
            "downloads": downloads,
            "avgRating": avgRating,
            "uploaderName": uploaderName,
            "uploadTime": uploadTime,
            "category": category
        }

        # print(datasetDetails)
        file_name = dataset.file_name
        UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")
        target      = os.path.join(UPLOAD_FOLDER, 'test_docs')
        destination = "/".join([target, file_name])

        if not path.exists(destination):
            return jsonify(msg="File Not Found Error"), 401

        df = pd.read_csv(destination, encoding='utf-8-sig')
        
        reviewArr = Review.getReviews(dataset_id)
        reviews = []
        for review in reviewArr:
            user = User.find_by_id(review.reviewer_id)
            reviewer = user.username
            rating = review.rating
            comment = review.review
            feedback = {"reviewer": reviewer, "rating": rating, "comment": comment}
            reviews.append(feedback)

        try:
            # rowlis = df.head(5).values.tolist()
            rows = df.to_json(orient="values")
            # print(rows)
            values = json.loads(rows)
            # res = json.dumps(values, indent=4)
            print(f"type of values = ", type(values))

            collis = [] #all columns
            missingvallis = [] #missing values in each column
            uniquevallis = [] #unique values in each column
            for col in df.columns:
                collis.append(col)
                missingvallis.append(int(df[col].isna().sum()))
                uniquevallis.append(int(df[col].nunique()))
            
            numcollis = list(df.select_dtypes([np.number]).columns) #numerical columns
            meanlis = [] #means of numerical columns
            stdlis = [] #standard deviations of numerical columns
            minlis = [] #minimum values of numerical columns
            maxlis = [] #maximum values of numerical columns
            quant1lis = [] #1st quantiles of numerical columns
            quant2lis = [] #2nd quantiles of numerical columns
            quant3lis = [] #3rd quantiles of numerical columns

            for numcol in numcollis:
                meanlis.append(round(float(df[numcol].mean()),3))
                stdlis.append(round(float(df[numcol].std()),3))
                minlis.append(float(df[numcol].min()))
                maxlis.append(float(df[numcol].max()))
                quant1lis.append(float(np.quantile(df[numcol],0.25).round(3)))
                quant2lis.append(float(np.quantile(df[numcol],0.5).round(3)))
                quant3lis.append(float(np.quantile(df[numcol],0.75).round(3)))

            result = {
                "columns": collis,
                "missing_values": missingvallis,
                "unique_values": uniquevallis,
                "num_columns": numcollis,
                "mean": meanlis,
                "stddev": stdlis,
                "minlis": minlis,
                "maxlis": maxlis,
                "quantile1": quant1lis,
                "quantile2": quant2lis,
                "quantile3": quant3lis
            }

            #Plotting Histograms
            # plots = plot_histsmooth(df)
            # result['plot'] = plots
            
        
        except:
            pass

        response = jsonify(reviews=reviews, datasetDetails=datasetDetails, result=result, values=values)
        return response
        # return jsonify(result=result)


    @jwt_required()
    @cross_origin
    def post(self):
        user_id = get_jwt_identity()
        print(user_id)

        review = Review.getReview_by_reviewer_id(user_id)

        if review:
            self.reviewed = True
        else:
            return jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 401

        return jsonify(reviewed=self.reviewed)

        