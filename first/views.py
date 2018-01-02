from __future__ import unicode_literals
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import os
import json
# Create your views here.


def index(request):
    return render(request, 'index.html')

@csrf_exempt
def get_mus(request):
    #读取歌曲列表
    mus_dir = os.path.dirname(os.path.dirname(__file__)) + '\\templates\\static\\music\\'
    mus_list = get_file(mus_dir)
    print(json.dumps(mus_list,ensure_ascii=False))
    return HttpResponse(json.dumps(mus_list,ensure_ascii=False))


#读取歌曲列表函数
def get_file(mus_path):
    mus_list = []
    for parent, dirnames, filenames in os.walk(mus_path):
        mus_list.append(filenames)
        # 获取当前文件夹写文件数,继续数目新增命名.xls文件
    return mus_list