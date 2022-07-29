import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Icon, IconButton, ImageList, ImageListItem, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import axios from 'axios';


const raw = `{
    "status": 200,
    "listing_count": 433275,
    "page_count": 43327,
    "per_page": 10,
    "data": [
        {
            "_id": "de81b025-2c62-4c97-8a75-e501d09dfc0c",
            "raw": {
                "source_url": "https://www.spoticar.co.uk/second-hand-cars/citroen-berlingo-15-bluehdi-650-enterprise-m-swb-euro-6-ss-5dr-sunderland-100248286",
                "price": 15954.0,
                "mileage": 25304.0,
                "built": 2020.0,
                "make": "Citroen",
                "model": "Berlingo",
                "trim": "Berlingo 650 Enterprise Bluehdi S/s",
                "body_style": "Panel Van",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Manual",
                "doors": null,
                "registration": "CK20XNT",
                "registration_date": "2020-06-26T00:00:00",
                "exterior_color": "White",
                "dealer_id": 10044183,
                "dealer_name": "Spoticar",
                "dealer_number": "01249 479679",
                "dealer_location": "SN14 0UX",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": null,
                    "city": "Wiltshire",
                    "county": "Wiltshire",
                    "postal_code": "SN14 0UX",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_1.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_2.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_3.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_4.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_5.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_6.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_7.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_8.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_9.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_10.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_11.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_12.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_13.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_14.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_15.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_16.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_17.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_18.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_19.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_20.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_21.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_22.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_23.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_24.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_25.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_26.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_27.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_28.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_29.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_30.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_31.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_32.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_33.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_34.JPG"
                    },
                    {
                        "url": "https://s3.eu-central-1.amazonaws.com/vophotos/1280/SP/GB/CITROEN-BERLINGO-248286_35.JPG"
                    }
                ],
                "engine_cylinders_cc": 1500
            }
        },
        {
            "_id": "c6d25fd8-9431-433d-a564-d38d843a057c",
            "raw": {
                "source_url": "https://www.sherwoodsmotorgroup.co.uk/used-car-details/used-peugeot-expert-expert-van-20-bluehdi-120-pro-van-mwb-bianca-white-manual-diesel/id-143451/",
                "price": 23995.0,
                "mileage": 4501.0,
                "built": 2021.0,
                "make": "Peugeot",
                "model": "Expert",
                "trim": "Bluehdi Professional L1",
                "body_style": "Panel Van",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Manual",
                "doors": 6.0,
                "registration": "ND21UWK",
                "registration_date": "2021-05-21T00:00:00",
                "exterior_color": "White",
                "dealer_id": 10041477,
                "dealer_name": "Sherwoods Peugeot Gateshead",
                "dealer_number": "01914 999264",
                "dealer_location": "NE8 4AP",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Durham Rd",
                    "city": "Gateshead",
                    "county": "Tyne and Wear",
                    "postal_code": "NE8 4AP",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-acfa004ef1838b3749fe0d8088a61b4b8e3f2edd.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-d1c2c631bd6cd376850e4bb8f7ee1dec4346b4ed.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-ce134aaeb077210538f4d8b3cd00acd2f21d3268.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-e35dad51a80d512f0b017f1b9ef4465e89afba46.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-e40b5508c19d5d30952e5ec5c9e1abaccd6f1234.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-a377ce55ab89d1d91885caff033e60d61685b8d3.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-1226581d36041272a7bccd47f3fe76966e6d9239.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-d56a8664c120e7e13f234c93db85d208a48f6a25.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-21348ad2944ce3280f78288e5abbd385bc6714e9.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-1188231c5ef8f09ea8563fbbdd8b4bbf424d1d49.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-49fe536198f234f580d2d8641a7033f7c14dfa40.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-dcafda52b6b0c000517c22539bdecab1fdf8737a.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-7e5fefd3e905428b58bfbc3f494cb9cd6c53e58e.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-c6df4f176e3629259f4dd825d04e6cc861bcdfb1.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-a1f464154cf118044588f531ccaf8bfeac67b42f.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-d649970281eec117d2fedf7af7d9b90f404206ed.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-c05e83a70cda9e24fd523c2c252125480cfac37d.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-d5da13c319c99edb89ce44db1f2ed3a1bd732353.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-14ad317ae8646aab77da870893818e437e9517b5.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-6f901f8d6c06b4935abfba2b4678e8f9f4b1d530.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-b8bb86515973d0c8bae841240817615f348c2a67.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-e0720c2d135efac238cf25d1b1ad53bb08764d3e.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-9d439caca943f7b6d06efd96f64b4b2e53d9e7c3.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-1c36bf98b554b2b905327115a579e7e18634ae2c.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-fc865e67938066c99f1b934ef7c2b11516787553.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-aa2c65a76ea23c568a7cc239ab94bcc4d43bc8ef.jpg?width=1200&quality=80"
                    }
                ],
                "engine_cylinders_cc": 2000
            }
        },
        {
            "_id": "1398de7e-2692-45e1-a19d-5d1c47b88219",
            "raw": {
                "source_url": "https://www.sherwoodsmotorgroup.co.uk/used-car-details/used-citroen-berlingo-850-enterprise-l1-bluehdi-van-swb-grey-manual-diesel/id-190649/",
                "price": 10995.0,
                "mileage": 49836.0,
                "built": 2018.0,
                "make": "Citroen",
                "model": "Berlingo",
                "trim": "850 Enterprise L1 Bluehdi",
                "body_style": "Panel Van",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Manual",
                "doors": 0.0,
                "registration": "HV18VTE",
                "registration_date": "2018-06-06T00:00:00",
                "exterior_color": "Grey",
                "dealer_id": 10041477,
                "dealer_name": "Sherwoods Peugeot Gateshead",
                "dealer_number": "01914 999264",
                "dealer_location": "NE8 4AP",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6b",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Durham Rd",
                    "city": "Gateshead",
                    "county": "Tyne and Wear",
                    "postal_code": "NE8 4AP",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-07eba58a2ec3cd43422b8c77ed18192db1e75546.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-a611a7968ca1d319cb38b8d0c52230abce9784db.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-954c0c683fb51414b83c771e104417e4361199d0.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-71f0e9e08aa24446e8bc895327452f9d6450b777.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-9dfc9e6e13dfab0747a00889f4e094387a722718.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-7ec6fc6b8e8f899507ddd6fd9e39ece7b6b5378c.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-f15d4f8a4720ebc263b8fd62252ed5a6f8ee96d0.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-53edd0987baeec7c637acf2a3b48886a11320318.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-b1b2eab96569634df390d6ded6c755362ea32884.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-1e094b7e3c0eaa1521fc506ce77a237bd667cebf.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-0dd76af2065c802a4285913ffa25984dafed655f.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-eb516d08d746878e17211ea951938729d6b526a8.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-dc40e2b8844d486d4176da0c49cce4315b3f3d37.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-789680e542c18e4df535e96f0f979938f088255e.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-9949975a25a960e8956afb3ac16c866a66e969b8.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-9f5371f6dc69dd1cf6f343698d7e7c965c260bdd.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-154716c2b9052f37b94685a4092d1761d3500a11.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-399c8c91628ae682e0dc44c57782d3b4986d7e82.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-809e0f223055b688eff64aae436ec1a6c4839a16.jpg?width=1200&quality=80"
                    }
                ],
                "engine_cylinders_cc": 1600
            }
        },
        {
            "_id": "985850de-908e-4c47-a8e9-b754972d272a",
            "raw": {
                "source_url": "https://www.sherwoodsmotorgroup.co.uk/used-car-details/used-citroen-relay-35-l3h2-enterprise-bluehdi-ss-van-high-roof-icy-white-manual-diesel/id-193893/",
                "price": 27500.0,
                "mileage": 1.0,
                "built": 2022.0,
                "make": "Citroen",
                "model": "Relay",
                "trim": "35 L3h2 Enterprise Bluehdi S/s",
                "body_style": "Panel Van",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Manual",
                "doors": NaN,
                "registration": "ND22ZDH",
                "registration_date": "2022-06-30T00:00:00",
                "exterior_color": "Unknown",
                "dealer_id": 10041477,
                "dealer_name": "Sherwoods Peugeot Gateshead",
                "dealer_number": "01914 999264",
                "dealer_location": "NE8 4AP",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Durham Rd",
                    "city": "Gateshead",
                    "county": "Tyne and Wear",
                    "postal_code": "NE8 4AP",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-f2e9127d48747955c5072ae09f9bc58ad7a454e9.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-f221cc1dee219f66c627425ef4742703ea1e5904.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-b28eac197903bfe0886acc6ef9e311f6a52bb6d2.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-ed9b66785bc6a11ed9de915471bb62fd3e813fb9.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-db1f04c416c465669245508dc050338969c80a12.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-65f427b8782958ca095b694067651a62b68857a3.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-193480e227a5ba0d00a46ae445f54f5c48f29e25.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-cbd501a132947617dc5da796217c31ddedae3d15.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-e5067a8d47691883a4db102df7ed5244b35f02a0.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-0e003f28b63a1c299c1817be068400e5a580a14d.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-8d59a51b0de346a990446620f734f7aa1a2b8cbd.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-752433ffbecc81e867e465e64716143ccde373d2.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-8b7874cdd9e33ece053423b0b1c59cb2fb208ba1.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-27fd0497b8d76538db534cf1c2b4098e7d76f498.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-66a9f7be8ff27670ef2e6911740bc1cd73e4e343.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-2710ae7d2dc26129ecda4a813e445f0e8a3db17a.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-1cd5f89bd2dc0f87751e98a43d2eed22c6830b94.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-dccfde2c2b760830c22b3b6efb057fcb092804ea.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-cbe6e40a5131b3c6ebc75c228e27190f07eb9892.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-c9cff18b4bae3c60f2785c999548b2530c995b02.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-1041b2845e2b77dc7bc808f6b2ab3ae9db371b43.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-cca612cd60140e0f0fb49455d278b399b5e5c673.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-fcd94f024860f951ae0755dff3c5223a5101acd6.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-ddb2526cab7e8e514c27fbceec02be195c80fb24.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-9f05d7df3c70267d5dc6bef668fb39e67246e3b6.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-9bcc9f375c450c5d7918b7086674b2487580ee6f.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-dda7b99cd66d9f8c6d8318597a368d9f717ba9c7.jpg?width=1200&quality=80"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-b03ad77945d88a96ba395a1cd3f28f54b7a2f41d.jpg?width=1200&quality=80"
                    }
                ],
                "engine_cylinders_cc": 2200
            }
        },
        {
            "_id": "bec2301b-abeb-464f-9bf6-9186a73f1666",
            "raw": {
                "source_url": "https://www.sytner.co.uk/car-search/14774675-mini-countryman/?supersearch=1",
                "price": 33000.0,
                "mileage": 5133.0,
                "built": 2020.0,
                "make": "Mini",
                "model": "Countryman",
                "trim": "Cooper S Exclusive",
                "body_style": "Hatchback",
                "fuel": "Petrol",
                "fuel_type": "Petrol",
                "transmission": "Automatic",
                "doors": 5.0,
                "registration": null,
                "registration_date": "2020-03-01T00:00:00",
                "exterior_color": "Silver",
                "dealer_id": 10043243,
                "dealer_name": "Sytner Group Ltd",
                "dealer_number": "+44  01162 821000",
                "dealer_location": "LE19 1ST",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "2 Penman Way",
                    "city": "Blaby",
                    "county": "Leicestershire",
                    "postal_code": "LE19 1ST",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF8zMTA4OTI3YmM4NTc1ZGZhYzFiYzRmYjNjZWJhMTg5Y18xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTEzIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF83NjgwNzZmZjAyMDhhMWI3YTQwNjk1ZTI0MjlmYTZjN18yLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTUwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF83Y2Y3ZTkzZjE3NGIwNjhhNWQzNDg0MTYxNTFkYzMzNl8zLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTMxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF9lMWViMmRlMTYyYmIxM2IwMGRmMDA0NzZkZGRmMjBmZV80LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTIyIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF84MTc0Y2VhMjhlZWQwMGY1NDVlYjM0YzZiMmUxM2RmMF81LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTEwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF84YTVkMDM1NWYwMjI4MmQ0Y2Q5MjFmMWZhOTk4ZTMyM182LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTA2IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF82ODkwMWFlYjNjMTkxZDc3MzZkZDhjYTI1M2FmZDU1ZV83LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTExIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF8yOTVlM2U1ZWM1ODA4YjVhNjM2MDI4Y2FmYzQ1ZGNlZV84LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMTMxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF85MDlkMjc2YTMwMDkyMWY3NTZhNTgzZTM3MmQ3OGY4NV85LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNjU3MTgxMjEzIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo5MDAsImhlaWdodCI6NzUwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0="
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF83ZDk4YTg0MDZmZWM1NjljOWZmNzA5YTJkY2ZiZmZhMV8xMC5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTExNSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF85YjBjYzJkOTRmOTE1NzRkZjAxYzc1YTExNjgzZWI0Y18xMS5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEwOSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF9hNDFjMTc2M2UwMzhkZjZmMjM5YjE0MmY3YTNiYWZiZl8xMi5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEzNyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF83OWUzYmFkNTNmYTJmMmJhNTRjOTFmZTJiMDA3ODRkMV8xMy5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEwNyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF9iOGY1NmVkODgzM2Y5YzJkNWUzZGFlNDhjOTE0NzIyNl8xNC5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTExNiIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF85MTNjYWU0NzVjOGIxMjQ2NTM4ODIxZDJkZjhjMWFhN18xNS5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTE0NSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF80ZDE2NzhkNDFlYTRjNDg3NGNkYjFmMTg4ZmRlZDQyOF8xNi5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEwNyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF8yNzM5NGRhNjA0YzdiZjI5M2MzYTkyZmExNzNjMGRlNF8xNy5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEzOCIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF81NWM5N2I2ZTg4MmZiN2VlMzNmZTA1NTc2YTU0MzliMF8xOC5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTE1MyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF82YTYyZTA3MTQ0ODVjNzRjNmNkNDA0YTU0MTE2ZjMzZF8xOS5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTExNSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF9kMzdhMzI0YWIwYzc4MDEwMDRmNmM0ODljNmI5NjFkMF8yMC5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEyMyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF81MjdjYTc4MjI0Mzk4OTZlYWI4Nzg5MmNhZmQwYWY5Y18yMS5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTE2NCIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF9hNzhjMjYxYjc2ZDMyOWZiOGQxMzAwZTcxZDJiYTExM18yMi5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTE2NSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF84MTUxYmVjZjRlNWE1NWUyMGRkOGZkNzg3ODQ3MDRmM18yMy5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTEyMSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    },
                    {
                        "url": "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrXC9pbWFnZXNcL3N0b2NrXC8wMThhZGRlY2Q0MTVhZjczNDFlZjIwOWUzOWY3ZDY4YWU0MTllOTdkXC8xNzcxNTA4XzQ2NTBNSF9mOWQ5ZmRjNGIzOTBiMGQxZTM3ODAzNjJiYTY5MWM0NF8yNC5qcGciLCJidWNrZXQiOiJhdXRvZnMiLCJsYXN0X21vZGlmaWVkIjoiMTY1NzE4MTIyNyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJoZWlnaHQiOjc1MCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
                    }
                ],
                "engine_cylinders_cc": 2000
            }
        },
        {
            "_id": "1ec935e9-393e-41c9-b5f6-12ba4c3fb4d7",
            "raw": {
                "source_url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-peugeot-208-12-puretech-signature-euro-6-hatchback-white-manual-petrol/id-581018196892077770/",
                "price": 9900.0,
                "mileage": 30740.0,
                "built": 2018.0,
                "make": "Peugeot",
                "model": "208",
                "trim": "S/s Signature",
                "body_style": "Hatchback",
                "fuel": "Petrol",
                "fuel_type": "Petrol",
                "transmission": "Manual",
                "doors": 5.0,
                "registration": "BK68BWJ",
                "registration_date": "2018-09-26T00:00:00",
                "exterior_color": "White",
                "dealer_id": 10041533,
                "dealer_name": "V12 Sports And Classics",
                "dealer_number": "03300 194598",
                "dealer_location": "LE10 3DJ",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Unit 23 Harrowbrook Road",
                    "city": "Hinckley and Bosworth",
                    "county": "Leicestershire",
                    "postal_code": "LE10 3DJ",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-cars/"
                    },
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-peugeot-208-12-puretech-signature-euro-6-hatchback-white-manual-petrol/id-581018196892077770/#"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/edb6a31e4c18471f8c15c6cd875fa078.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a58a9dbd334c426197dd4126d772e6f0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d1542e9d4ad4447c96c87885772b843b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/eee7c36e76f5465b8d39f9fab08b605e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6d6b2d0117eb40f696c8d5fcd3fffd4b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2156901b2d5a4c1784fdc6772aed5db9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/dead995d0f844615bd174cba857f90cd.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/faeae1f666cf45cf8cf2bd51f59dd4d7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f1780c4b863e49498ff256fcf43124e6.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/342a95bd5716459a9e37188036ee69eb.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b9c5d26271304966b82cd958a6e5fc8c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/66e01351df3d4a44adb706ed8f070b54.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/343c2e4282b1424f881708614a428eaf.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cc4c4728675d49c49083df3b5493695e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/195d0e7a1635419da95f6097ddc380d4.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d569c2e348514ccfb1beab4d53c65de8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/db1323e9f9db45ab8474fd761afe3b42.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cdb9f0d73de445acb9df30ada939620e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/53b799aaf1cd4e258083b7f80099f4d1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2250815596774e369d5487bf0422decc.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e1f951082b3740d4b8230ff90e20c7ce.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/32bdff67a2aa4df68b201d56adf55294.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/daf9082b912544f09771ee584a931eed.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/06268af2a55a4eb8a929546ec7cb3663.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e7c5a8c11c3445fd927398cab328fed7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7d377839ab9b48c3959a815db4327648.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b854958f1b9540faa331528c2f9a9dd8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9095f1800943460798cba2458babb946.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ea316a6d74c84fa5996f3d5dae41b48f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f62d2baa69d54e37bdab3a8679fa2797.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8dce97224d9c422e8e87bd5bcd1efb3d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7286285aa4184a1597bde85c59058358.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/750db477f8a348d39baa8372cd09b9ca.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b5ec14db437540849e63beaa2c4497e9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/bfdafb8686334b168b7ea3053c171c11.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f37698ae53594aa58b21a28f887e97df.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/62a2af2a32fb4c2da0fdb378ba434b51.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8d9bfd4a81a8495b92385b60351182fe.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9bc8bf7498254aad881f3ca86f46dcbc.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ff57dd7244fd4d498e9e3ecd8fe9e71b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/eac17cde26bc461495fdff89fad49ec3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e0b87b725d864218ba159fa8bfc42f3c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2c7ed5e555e74f75899c22aeca1e4a69.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9c62ee182ac442ed8188859e92ab0c51.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2062d81a66fb4221b7689c0186da2e2b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ed49ba87a9a148ff8924311a22b1874a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/326fc5b834294da5b4540df2ebf041ec.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/19ad628198d74c51ba2a3998fee7b728.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/edb6a31e4c18471f8c15c6cd875fa078.jpg?imgeng=/w_1024/"
                    }
                ],
                "engine_cylinders_cc": 1200
            }
        },
        {
            "_id": "b7409ab4-3241-4243-a1e1-4e9f99bd603b",
            "raw": {
                "source_url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-jaguar-xe-20d-r-sport-auto-euro-6-ss-saloon-red-automatic-diesel/id-283818337018184628/",
                "price": 16700.0,
                "mileage": 50450.0,
                "built": 2017.0,
                "make": "Jaguar",
                "model": "Xe",
                "trim": "D R-sport",
                "body_style": "Saloon",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Automatic",
                "doors": 4.0,
                "registration": "VE67HVD",
                "registration_date": "2017-12-21T00:00:00",
                "exterior_color": "RED",
                "dealer_id": 10041533,
                "dealer_name": "V12 Sports And Classics",
                "dealer_number": "03300 194598",
                "dealer_location": "LE10 3DJ",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Unit 23 Harrowbrook Road",
                    "city": "Hinckley and Bosworth",
                    "county": "Leicestershire",
                    "postal_code": "LE10 3DJ",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-cars/"
                    },
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-jaguar-xe-20d-r-sport-auto-euro-6-ss-saloon-red-automatic-diesel/id-283818337018184628/#"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/90f8b1bd25f84637a9ada957f1c39ea7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e559a847ef454348ba20abd810a288a5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/5f97ff800b094b068938643d69624da4.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/39cf0e48654243b58e439a0cc4bee62d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cae425af05a541faa38824e6baa0d267.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/11fc87cad88c499991857033d0944070.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/72a8e2b3646640cfa86ef84c7cf98c3a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fb2c7218ffb149d9a9c9da368da66b6e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/4b8c2183ce89417cb37f30881bda5e27.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/0a69583974a14454b663a97c6cbca993.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1e8c1116108c4f49aa5b8fcf089a6c2c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/764616c702f84a418a8230db39c2ed3c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3d9ef7e716c4404abc58e441ea37e985.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a7befc24ed22407698f9d8a0b9a7d3d9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7e651fc14c564aedad1d2fd1d2f110a3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3b5a194e493a4da2b28465f5840e55e7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/215c9527187748ea85561234037fa9d7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9906caa3d64244698c07be4ea7988211.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cd4ea350abfa489ca881ae555eb8976d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8e4bb297414c4000a41dc5c038ae6a75.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/de5ec64ced144d5aa37a75b4cd7071ea.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/33e6d9c299da4ca88cdf5f041334d6e1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c6bf68e899b645208ae261c977c2162f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/feb25f4386b543f692206d13f0ef496d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/de7377f6688048f3a31db06ef0b3a65a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a28b2a56e5214aab9d1e644ce20a9d20.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b6fbb49edc2c410e993ca389e3291650.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b30c60860bfb4565a37a24d68ddc997c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/33f46cdbe8c9430c8165679459ba4d96.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c00f9bdb997844baa80d58a1f1566342.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/69258db6123347c3b35b9d4825ee3903.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c1f7f0fdceb449309e8ac7cc173a40cc.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/0a88633be8cf4a43b434d9dbebd2b2c7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e9aa3d8a9e694fb89a086c8cef2b453a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/4cfe283d0c2f40cb81b73173e4d02214.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/85d47356c54940c882e9d2d922175f59.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/87595fc7d5d3419b8303c1462d639096.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2007a928eec840788e69839bcdcb708e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/79b6f15d58dd45e0b0582e229fc494ce.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ba85f351e65a46f696c4561f11668ad5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/434f5dca864a4c3cbb822f43c3db5c92.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e8225930cec2445c8cee0216d5c34c97.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a1f440935f6349f7b98be771e0fffdc0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3346b4df108c44ed86cfe51ebddc9f4a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/0160abd6aaac4853b5f980dec6177a16.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/dcf51f5e516f4d1d8cae6d3db779aff6.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/03bae1d7baa545808d3ccefeba1aaaef.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3426118edc824041ad99e3eca7412c22.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/67c7b40bd4714cc6b4e73e27dc16f77b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/558a0e5ba9354c08b01523cc0d54bc0f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/52c25edca82c4436a438597df276533f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fad7c332c8414f1189a3fdb6f7ba9e0b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/205fb60eaf7f41cd84349b76685d8733.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3dd41def35564b4b831b42380791ae23.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/41a99c87b83e45fdb794dd0094d23a27.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f64d2c006b5f4108880d930467c1b1d3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/229745bb70b644ff84432d5e347aee5e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1fc73e08398b46fbb8ee3f6fd39cf4d4.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/163ff1cb191f42d48c797e3c0b81603c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c4661f2bfb104fbebcd8998503d70442.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/52ba12f353564eb087f56ad87eb8b64b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/15dfe010d734430599f27a6a1f9f118d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/90f8b1bd25f84637a9ada957f1c39ea7.jpg?imgeng=/w_1024/"
                    }
                ],
                "engine_cylinders_cc": 2000
            }
        },
        {
            "_id": "2fd77bce-7a46-431a-ae76-a0a5b27f23f8",
            "raw": {
                "source_url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-audi-a1-14-tfsi-sport-ss-3dr-hatchback-blue-manual-petrol/id-842107570172800/",
                "price": 10900.0,
                "mileage": 23330.0,
                "built": 2017.0,
                "make": "Audi",
                "model": "A1",
                "trim": "Tfsi Sport",
                "body_style": "Hatchback",
                "fuel": "Petrol",
                "fuel_type": "Petrol",
                "transmission": "Manual",
                "doors": 3.0,
                "registration": "MM66VEB",
                "registration_date": "2017-01-26T00:00:00",
                "exterior_color": "Blue",
                "dealer_id": 10041533,
                "dealer_name": "V12 Sports And Classics",
                "dealer_number": "03300 194598",
                "dealer_location": "LE10 3DJ",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Unit 23 Harrowbrook Road",
                    "city": "Hinckley and Bosworth",
                    "county": "Leicestershire",
                    "postal_code": "LE10 3DJ",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-cars/"
                    },
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-audi-a1-14-tfsi-sport-ss-3dr-hatchback-blue-manual-petrol/id-842107570172800/#"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/4e62fbba509041d794e2f4d299cef5a9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6377e9366e7b4a75bc8000a24db8f7b8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a27716daaf31457e857a9a4c4d14f14c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9d75ce693c7448dda86464ba8e73cd27.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a365e7e5ca30451d9b5f8523a966ded7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e0428d42e7984523b74b679c917300a6.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ceaa8de3bdc14688bea800d90bf70c76.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d93d5ddb356a43fbb0def7ba0201faeb.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/4d3ca82f1ad946bfa1baca5650c42fc9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7184baf43e854f3186c963d361eba3c3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e4706e649fb24d49ac3c79c02bededba.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7023bd7ed39740a7b7ccebefff1bdcd8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d9db6656cda841839a3d8ca0909a17cb.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/91297891e90b4081b5eece4bc7f0b202.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a8dfa1e1064049ce8b00b3f2a81a9cfc.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/79ef6f4d0d394839b5b74b021c3748f1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d05bf8710c6042abbf1f0f6a6468cbd1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/93d265dd39d04bbc86daeae1c27a833e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/320d29ba18834a66aa82ab0e7bbdb632.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c5c15681c65744f7a6e53f0e9dfe92b5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e171023c90be4e54840aa5e586e97f64.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/5520d12851464593aa6b696312aa9d80.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a7a351b5adf740ea9ae40d86dbd89608.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d2cca39350f34a639cc29650130b13b5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/87bb557d7959447eb74d56531dcc4c6f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b1bea750991e4930b2e7a944d8d05bd2.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/700c7af4ffec4f3faa4213a06855c9e2.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/aa67a00ff48c43c491a433c414e139ef.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/998cc999f06c4a548f089dcd1e4d8629.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d0bd400ed22e4e14a68cef9310479994.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/75c8b76cd3f64b3f8280dbec0d8d0f4d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/738f552e39aa49c1bd2b4f040486801a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d923e6ca2eca41108f7e1b37739af0b4.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/5c4112fe1e6b4f1eadd809d0515fe9e3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a8ba4c9185824135b3b0ec764c1f1842.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/64b98b0a312842a1bc1f9905c310b237.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8452a4629fad41e5983c688575c58665.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ff9883a153324c5687c82c3e0bb5b1b1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/794ed36d7539447bafe0cfee7a41732e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1eba969f371849f19ac72da60d493a13.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d8b6c31a9eeb470d92b97a3cc37cf5e8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/661e045cd1f44eefa0e4757ec7822413.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3b6f780dd67043d4be73515d455f91ad.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/935251feb3e54825bc386592c25648b7.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6c198f8a7c894eb593dc51c5d075a277.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fa84e7e2e2764d609438bb6e9796b89c.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2ffda989801845ffa96da083626babdc.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/bef2f1c1330248e280a0ebd6bdef78a5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/47a118535d004e929f6d75ea2b44e8cd.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ccaa46a8fa6f4e94b77ca9d41747eb7e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9b3d4e9c8c4e4ba5b870cd25bb67ca99.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/22833b7768a841d1bf97b935f3c562a0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/4e62fbba509041d794e2f4d299cef5a9.jpg?imgeng=/w_1024/"
                    }
                ],
                "engine_cylinders_cc": 1400
            }
        },
        {
            "_id": "6ec140b2-f9b0-417e-8f78-10482bc00992",
            "raw": {
                "source_url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-renault-kadjar-15-dci-signature-s-nav-edc-eu-suv-blue-automatic-diesel/id-477817101817116031/",
                "price": 12000.0,
                "mileage": 104960.0,
                "built": 2018.0,
                "make": "Renault",
                "model": "Kadjar",
                "trim": "Signature S Nav Dci",
                "body_style": "Hatchback",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Automatic",
                "doors": 5.0,
                "registration": "LX18WLR",
                "registration_date": "2018-03-07T00:00:00",
                "exterior_color": "Blue",
                "dealer_id": 10041533,
                "dealer_name": "V12 Sports And Classics",
                "dealer_number": "03300 194598",
                "dealer_location": "LE10 3DJ",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Unit 23 Harrowbrook Road",
                    "city": "Hinckley and Bosworth",
                    "county": "Leicestershire",
                    "postal_code": "LE10 3DJ",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-cars/"
                    },
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-renault-kadjar-15-dci-signature-s-nav-edc-eu-suv-blue-automatic-diesel/id-477817101817116031/#"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1fa48225b318427d89c32da9e686408d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f8bd34b620614fdda2643c62df1fdad8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/776c3c42cecb45398358e5256899136d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b99feafb528d42db8db3f0467bf78b7d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/31f7f81710654f2d99ded3e9f8cd138b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/5447ad72982d4031be8b334ff942d8a9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b0a8c7809a644d828cb1b5e4156cc6d6.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3447478c7e09434c85c8ca44be8c7e96.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1a48881088f74bc2a794da02e8b6dd95.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fafed7f3f43e4e20a98fe8023986404b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c667be022c42462d9827ede2a37efd49.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8e5cfaaa50d44bcc896e5d4c2ee46c38.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/07aae78cd68a4b5193790744b35fbb8a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fa352f53cb2e46cca289b5796351b46d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6a7a912fa5aa43169cb1c824a461c27b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/450b684c1a8b47e5bf9e262dbe39652d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b255bff078384229a85a41ea4f455d8a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/423b4525a88a46a1b870ec427aa3daab.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/69868b2896714926b7aefdcda5f98074.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ac1dd0c0e4644130ada24c3a90ed5e94.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/eb13a14033f0414aa2ca58f7537e7f5d.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c2ececff658b4e89b8c1734d245f4c5a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f6f44912367945f5b457155a06aee941.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8b379a622cf3436485d63d00526d31e3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b4ec07cb81f24aca830787eb83fc5a9a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2d11b40b1a1a4624ac0de000e7c53baf.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b2f28e7324544c44af26acdbc2df0baf.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/91dbea4c0d65421b90558355fc692bf1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a7675862257f4af298fc2ebb2913d6ed.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f2ab6399f24c443e9f9034dc39f8fc67.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/794d2bd4f81040c1871d11eea88d033f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3ed2852f09c6405895129656e2935112.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/5847e97d122e4107b3d58c8da010653e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/630324aead3d4b3b85be1827906591f2.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9e98def3877d442683b273e8759d5509.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/0387a4cb874f4b779d46a203b31d2663.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/946a0d22d6ae404d81e71bf2cdcefbb8.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/bf05610e49f04d9a897c27c25f973992.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b81e50701d78436fa66346638334f1c0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/d78e63828fd6455e8622d11ab21c3dae.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/23dcac64ada247a9aa9ccdd202850cc3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1e939e4af5d540b58f3041840c79c085.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/4eb93cba7e524cbea7218010a9f97d34.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/39e07a61b8984fa0a59cc719dd2f0b0f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/543a847295bd4888b84afaaf04ab10da.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fadc1e2bdb0f4a05820ca4c7f1bead02.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e117277ba71a4aa7b82d044ba8638919.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/74f2e184e2864b1685a70cd5900e8388.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/72925afd772a44598c2ea9dae21ff01f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/814964cceae74a8d95ee6a861428e475.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/dcdd98863836437ead564b90cbaeb29b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/94f9ea546d604626b2d74208c5bb4df5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1fa48225b318427d89c32da9e686408d.jpg?imgeng=/w_1024/"
                    }
                ],
                "engine_cylinders_cc": 1500
            }
        },
        {
            "_id": "d3bf32cc-08e3-4be1-8b2b-079a58905dfa",
            "raw": {
                "source_url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-audi-a3-16-tdi-se-technik-sportback-e-hatchback-black-manual-diesel/id-118133301814943323/",
                "price": 12500.0,
                "mileage": 66810.0,
                "built": 2017.0,
                "make": "Audi",
                "model": "A3",
                "trim": "Tdi Se Technik",
                "body_style": "Hatchback",
                "fuel": "Diesel",
                "fuel_type": "Diesel",
                "transmission": "Manual",
                "doors": 5.0,
                "registration": "SW17EUP",
                "registration_date": "2017-05-24T00:00:00",
                "exterior_color": "Black",
                "dealer_id": 10041533,
                "dealer_name": "V12 Sports And Classics",
                "dealer_number": "03300 194598",
                "dealer_location": "LE10 3DJ",
                "cab_type": null,
                "seats": null,
                "write_off_category": null,
                "interior_color": null,
                "price_indicator": null,
                "admin_fee": "0",
                "vehicle_type": "car",
                "euro_status": "6",
                "imported": false,
                "scrapped": false,
                "location": {
                    "street": "Unit 23 Harrowbrook Road",
                    "city": "Hinckley and Bosworth",
                    "county": "Leicestershire",
                    "postal_code": "LE10 3DJ",
                    "country": "England"
                },
                "images": [
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-cars/"
                    },
                    {
                        "url": "https://www.v12sportsandclassics.co.uk/used-car-details/used-audi-a3-16-tdi-se-technik-sportback-e-hatchback-black-manual-diesel/id-118133301814943323/#"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/eeff2a03605541a1939c1c7af2aed8a0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6f9c74682dc143718dd40e98016d2c1a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/62b9fe87f987432ea5173bf41d88f1d0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/90570c3d5c474b399748f7a54a685933.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a490afdc977644fd9cdddcf50d512152.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b16105c1bdb0464093050bdb9b2f58d0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e9502bd8bcde485a9669d3560b286616.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/a52b6cf808cc4d61a7fc3fad48315e42.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e97ace2a07e44175853f15afd1fea149.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fbfe104228ba4482a849e20200a8cfbf.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6e73aea3e0b9438fbfbbd61f8ecdd023.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f433be845e9b4b94813efa90bdb97d00.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/59c9f12458bd4b4097e9a42f5f7b152e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8342b705ba8f441593e1f63a6cbad207.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1ac737a46d9d4327aa246e44bacc7565.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7dc9d53a001741d28e8491beb2265253.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/9c3e43c573f34e6c99ca483ba2a4631f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3265080fff854dc09a740a03eb515d11.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/bccb56b2259e4783a8f6d1ec47b599e2.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/fd4670d85db1477783bc2fc1206b3eb9.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/ef2fb781469340b8b225efcf9f4fd5ca.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6cdf903284e14aa68865fa0827ace0d5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/06f98669562749ce8ce2f0b25e67798f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/555d874dda30432d9d96df6746e348a4.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/231d14cbf9524f89b3c64a9977c3384a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/2a47975a41aa45b6bcd22757033f02c6.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/be43dc23b8cf402d81ae8bf941301af2.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/56e5f333192f4a95b2d476ef0bdb298f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/83bba8a521a44f1798d155e8685b80de.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/70ede8c4a1784bc68ac03f2528416585.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3d918b71380743279394a42b146f3f9a.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6c84f4d26a7b409088746037aa3dd9cc.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/566534ea227647b6aca91e54fda0f7b4.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8f4fadb42d924cbea9fbfb68f1b2d64e.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/08f1a11423934c7cae190065c6a5aad3.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1024f84ee8574580a6b944cb3067e770.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f662b96e22904393886cd763e7f41885.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/dfb46f360085400c98ff76e6f7c88d8b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/3a0655742dc34ce5a2ab6407c9677295.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/c68626725c5c40de94cbc936bf5cc052.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/63ee56fca20d4c618e206b3bb31c7fe5.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6b1975431ab4463c86ea502cbdc595fe.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/226c2d8c6d954963be53ce19a9696441.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/8ae4638dec89467085e11933c56aef76.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/14e5c1c5a01a4d3b8aa97cdc573beaa0.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/e94dd3f4e77b4cf1950608bc3e3c7bca.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f79d61594965487880f0575a5e49894f.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/aa557e07c3094149a14cd88640ed789b.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/7655975f4fd74190b6824b22165d3757.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6343e70753f14cfe98949ded01e0c6ef.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/b489038435334d918c72b3afd182e3b1.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/f98a5e0e3c394183b3d8944f25779900.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/6585e44170d449cb910d4ab91882b723.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/534fbe2d469a4a51866b913eae4c4a28.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/82953bc22968402dbaec2a316982e390.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/1f52561716da4cd691eb4fb0b090cd50.jpg?imgeng=/w_1200/"
                    },
                    {
                        "url": "https://bluesky.cdn.imgeng.in/cogstock-images/eeff2a03605541a1939c1c7af2aed8a0.jpg?imgeng=/w_1024/"
                    }
                ],
                "engine_cylinders_cc": 1600
            }
        }
    ]
}`

const AllListings = ({}) => {

    // let test = JSON.parse(raw)

    // console.log(test)

    const api_endpoint = "https://dashboard.motor.market/api/dashboard"

    const [selectedMake,setSelectedMake] = useState(null);
    const [makeList,setMakeList] = useState([]);

    const [selectedModel,setSelectedModel] = useState(null);
    const [modelList,setModelList] = useState([]);

    const [selectedTrim,setSelectedTrim] = useState(null);
    const [trimList,setTrimList] = useState([]);

    const [listingList,setListingList] = useState([])

    const [showProgressBar,setShowProgressBar] = useState(false);

    const [totalPage,setTotalPage] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalListings,setTotalListings] = useState(0)



   

    useEffect(()=>{

        setShowProgressBar(true)
        axios.post(`${api_endpoint}/dropdown`,{
            "what":"make",
            "where":{}
        }).then(res => {
            console.log(res.data.data)
            setMakeList(res.data.data)
            setSelectedModel(null)
            setSelectedTrim(null)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

    },[])

    useEffect(()=>{

        if (selectedMake == null)
        {
            return
        }

        setShowProgressBar(true)
        axios.post(`${api_endpoint}/dropdown`,{
            "what":"model",
            "where":{"make":selectedMake}
        }).then(res => {
            setModelList(res.data.data)
            setSelectedModel(null)
            setSelectedTrim(null)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

    },[selectedMake])

    useEffect(()=>{

        if (selectedModel == null)
        {
            return
        }

        setShowProgressBar(true)
        axios.post(`${api_endpoint}/dropdown`,{
            "what":"trim",
            "where":{"make":selectedMake,"model":selectedModel}
        }).then(res => {
            setTrimList(res.data.data)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

        // return () => {
        //     setShowProgressBar(false)
        //   };

    },[selectedModel])

    function add_mm_url(id,registration)
    {
        axios.post(`${api_endpoint}/add-to-mm`).then(res => {
            setTrimList(res.data.data)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

    }

    useEffect(()=>{
        setShowProgressBar(true)

        let what = {"raw":1}

        let where = {}
        if(selectedMake != null)
        {
            where["raw.make"] = {"$regex":selectedMake,"$options" : "i"}
        }

        if(selectedModel != null)
        {
            where["raw.model"] = {"$regex":selectedModel,"$options" : "i"}
        }

        if(selectedTrim != null)
        {
            where["raw.trim"] =  {"$regex":selectedTrim,"$options" : "i"}
        }

        axios.post(`${api_endpoint}/listings`,{
            "what":what,
            "where":where,
            "page":currentPage - 1
        }).then(res => {
            setListingList(res.data.data)
            setTotalListings(res.data.listing_count)
            setTotalPage(res.data.page_count)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
            
        })

        // return () => {
        //     setShowProgressBar(false)
        //   };

    },[currentPage,selectedMake,selectedModel,selectedTrim])

  return (
    <Stack alignItems="center">
        <Stack marginY={2}>
                <Modal
                open={showProgressBar}
                onClose={setShowProgressBar}
                >
                <Stack sx={{width:"100%" ,height:"100%"}} alignItems="center" justifyContent={"center"}>
                    <CircularProgress />
                </Stack>
               
                </Modal>
                
            
        </Stack>
        <Stack direction={{xs:"column",lg:"row"}} marginY={2}>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="make_list"
                    onChange={(event,value,reason,detail)=>setSelectedMake(value)}
                    options={makeList}
                    sx={{ width: 300 }}
                    value={selectedMake}
                    renderInput={(params) => <TextField {...params} label="Select Make" />}
                />
            </Stack>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="model_list"
                    options={modelList}
                    onChange={(event,value,reason,detail)=>setSelectedModel(value)}
                    value={selectedModel}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Model" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="trim_list"
                    onChange={(event,value,reason,detail)=>setSelectedTrim(value)}
                    options={trimList}
                    sx={{ width: 300 }}
                    value={selectedTrim}
                    renderInput={(params) => <TextField {...params} label="Select Trim" />}
                />
            </Stack>
        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} size='small' page={currentPage} count={totalPage} shape="rounded" siblingCount={1}/>
        </Stack>

        <Stack justify = "center">
            <Grid container rowSpacing={3} columnSpacing={3} justify = "center">
                {listingList &&
                    listingList.map((item)=>(
                        <Grid key={item._id} width={300} minWidth={300} justify = "center" alignItems={"center"} item xs={12} md={6} lg={6}>
                            <Card elevation={3}>
                                <Stack my={2} mx={0} justifyContent="space-evenly" direction={"row"}>
                                    <Stack>
                                        <Typography variant='h5'>{item.raw.make} - {item.raw.model}</Typography>
                                        <Typography color={"grey.700"} variant='subtitle1'>{item.raw.trim}</Typography>
                                    </Stack>
                                
                                    <Chip label={`${item.raw.price}$`} variant='filled' color='secondary' />
                                </Stack>

                               <Stack justify = "center" alignItems={"center"}>
                               <ImageList key={item._id} sx={{ width: {xs:300,md:450,lg:550}, height: {xs:300,md:450,lg:550} }} cols={2}>
                                {
                                    item.raw.images.map((img,index)=>(
                                        index < 15 &&(
                                    <ImageListItem key={index}>
                                        <img
                                            src={img.url}
                                            loading="lazy"
                                            onError={(e)=>{e.target.src="/default-image.jpg"}}
                                        />
                                    </ImageListItem>
                                        )
                                    ))
                                }
                                

                                </ImageList>
                               </Stack>
                             
                                    <Grid my={2} justifyContent={"center"} spacing={1} container>
                                        {/* <Stack spacing={1} justifyContent="center" direction={"row"}> */}
                                            <Grid item>
                                            <Chip icon={<SettingsSuggestRoundedIcon/>} label={item.raw.transmission}/>
                                            </Grid>

                                            <Grid item>
                                            <Chip icon={<AddRoadRoundedIcon/>} label={item.raw.mileage}/>
                                            </Grid>

                                            <Grid item>
                                            <Chip icon={<EvStationIcon/>} label={item.raw.fuel}/>
                                            </Grid>

                                            <Grid  item>
                                            <Chip icon={<ClosedCaptionOffRoundedIcon/>} label={item.raw.engine_cylinders_cc}/>
                                            </Grid>
                                            
                                          
                                        {/* </Stack> */}
                                        {/* <Stack spacing={1} justifyContent="center" direction={"row"}> */}
                                            {/* {item.raw.engine_cylinders_cc != null && item.raw.engine_cylinders_cc != 0 &&
                                                <Chip icon={<ClosedCaptionOffRoundedIcon/>} label={item.raw.engine_cylinders_cc}/>
                                            } */}
                                            
                                            
                                        {/* </Stack> */}

                                    </Grid>
                           
                     
                                <Stack my={2} spacing={1} justifyContent={"space-evenly"} direction="row" alignItems={"center"}>
                                    
                                            
                                        <Link sx={{ textDecoration:'none' }} target={"_blank"} href={item.raw.source_url} size="small" variant='outlined' >SOURCE URL</Link>
                                        
                                
                                        {item.mm_url != null &&
                                        <Link  target={"_blank"} href={item.mm_url} sx={{ textDecoration:'none' }} variant='outlined'>MM URL</Link>
                                        }
                                        
                                        <Button size='small' variant='contained'>ADD TO MM</Button>
                                        
                                
                                </Stack>
                      
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} page={currentPage} count={totalPage} shape="rounded" size='small' siblingCount={1}/>
        </Stack>
    </Stack>
  )
}

export default AllListings