FROM continuumio/miniconda3:4.10.3p1
RUN conda install \
    xarray \ 
    netCDF4 \ 
    bottleneck \
    numpy \
    pandas \
    matplotlib \
    jupyterlab
CMD ["jupyter-lab","--ip=0.0.0.0","--port=9090","--no-browser","--allow-root"]