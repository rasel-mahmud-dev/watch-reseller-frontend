function imageUpload(file){
    const formdata = new FormData()
    formdata.append("image", file)
    formdata.append("key", import.meta.env.VITE_APP_IMGBB_API)

    formdata.append("name", file.name)
    return fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        "content-type": "multipart/formdata",
        body: formdata
    }).then((res=>res.json()))
}

export default imageUpload