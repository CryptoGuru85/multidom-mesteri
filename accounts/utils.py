import base64

from django.conf import settings
from django.core.files.base import ContentFile


def base64_file(data, name=None):
    if str(data).startswith(settings.MEDIA_URL):
        return None

    try:
        _format, _img_str = data.split(";base64,")
        _name, ext = _format.split("/")
        if not name:
            name = _name.split(":")[-1]
        return ContentFile(base64.b64decode(_img_str), name="{}.{}".format(name, ext))

    except:
        return None
