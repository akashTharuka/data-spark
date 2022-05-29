from sre_constants import SUCCESS
from flask import flash, jsonify, request
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
from models.Review import Review
from models.User import User
from models.Dataset import Dataset

from flask_jwt_extended import get_jwt_identity, jwt_required

import pandas as pd
import os
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import json

def datasetList():
    datasets = [x.split('.')[0] for f in ['datasets'] for x in os.listdir(f)]
    extensions = [x.split('.')[1] for f in ['datasets'] for x in os.listdir(f)]
    folders = [f for f in ['datasets'] for x in os.listdir(f)]
    return datasets, extensions, folders

def loadDataset(dataset):
    datasets, extensions, folders = datasetList()
    if dataset in datasets:
        extension = extensions[datasets.index(dataset)]
        if extension == 'txt':
            df = pd.read_table(os.path.join(folders[datasets.index(dataset)], dataset + '.txt'))
        elif extension == 'csv':
            df = pd.read_csv(os.path.join(folders[datasets.index(dataset)], dataset + '.csv'))
        return df

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

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)


class GetDatasetDetailsApiHandler(Resource):

    @jwt_required()
    def get(self):

        identity = get_jwt_identity()

        if not identity or identity != os.getenv("ADMIN_IDENTITY"):
            return jsonify(valid=False, msg="Authentication Error: Invalid Token or Token Expired")

        # df = loadDataset(dataset)
        df = pd.read_csv('C:/Users/akash/Downloads/coin_Bitcoin.csv')

        dataset_id = request.args.get('id')
        dataset = Dataset.filter_by_id(dataset_id)
        title = dataset.title
        description = dataset.description
        fileType = dataset.file_type
        fileSize = dataset.file_size
        downloads = dataset.num_downloads
        avgRating = dataset.avg_rating

        uploaderID = dataset.uploader_id
        uploader = User.find_by_id(uploaderID)

        uploaderName = uploader.username

        datasetDetails = {
            "title": title,
            "description": description,
            "fileType": fileType,
            "fileSize": fileSize,
            "downloads": downloads,
            "avgRating": avgRating,
            "uploaderName": uploaderName
        }
        
        reviewArr = Review.getReview(dataset_id)
        reviews = []
        for review in reviewArr:
            user = User.find_by_id(review.reviewer_id)
            reviewer = user.username
            rating = review.rating
            comment = review.review
            feedback = {"reviewer": reviewer, "rating": rating, "comment": comment}
            reviews.append(feedback)

        try:
            rowlis = df.head(5).values.tolist()

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

            result = {}
            result['rowlists'] = rowlis
            result['columns'] = collis
            result['missing_values'] = missingvallis
            result['unique_values'] = uniquevallis
            result['num_columns'] = numcollis
            result['mean'] = meanlis
            result['stddev'] = stdlis
            result['minlis'] = minlis
            result['maxlis'] = maxlis
            result['quantile1'] = quant1lis
            result['quantile2'] = quant2lis
            result['quantile3'] = quant3lis

            #Plotting Histograms
            # plots = plot_histsmooth(df)
            # result['plot'] = plots
            
        
        except: pass

        response = jsonify(reviews=reviews, datasetDetails=datasetDetails, result=result, valid=True, msg="Authentication Successfull")
        return response