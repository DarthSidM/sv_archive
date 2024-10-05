from django.db import models

# Create your models here.
class FileModel(models.Model):
    pdf = models.FileField(upload_to='storage/')
    classNumber = models.IntegerField()
    subject = models.CharField(max_length=20)

    def delete(self,*args,**kwargs):
        self.pdf.delete()
        return super().delete()