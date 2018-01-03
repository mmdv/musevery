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
    #歌曲列表
    mus_list = [];

    # 白天歌曲列表
    day_time = os.path.dirname(os.path.dirname(__file__)) + '\\templates\\static\\music\\daytime'
    day_time_list = get_file(day_time)
    mus_list.append(day_time_list[0])
    # 睡眠提醒
    fall_asleep = os.path.dirname(os.path.dirname(__file__)) + '\\templates\\static\\music\\fallasleep'
    fall_asleep_list = get_file(fall_asleep)
    mus_list.append(fall_asleep_list[0])
    # 起床音乐
    get_up = os.path.dirname(os.path.dirname(__file__)) + '\\templates\\static\\music\\getup'
    get_up_list = get_file(get_up)
    mus_list.append(get_up_list[0])
    # 夜晚音乐
    night = os.path.dirname(os.path.dirname(__file__)) + '\\templates\\static\\music\\night'
    night_list = get_file(night)
    mus_list.append(night_list[0])
    # print(day_time_list[0])
    # print(fall_asleep_list[0])
    # print(get_up_list[0])
    # print(night_list[0])

    print(json.dumps(mus_list,ensure_ascii=False))
    return HttpResponse(json.dumps(mus_list,ensure_ascii=False))

#读取歌曲列表函数
def get_file(mus_path):
    mus_list = []
    for parent, dirnames, filenames in os.walk(mus_path):
        mus_list.append(filenames)
        # 获取当前文件夹写文件数,继续数目新增命名.xls文件
    return mus_list