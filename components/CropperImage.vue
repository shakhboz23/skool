<template>
    <div v-if="isLoading.store.cropModal" class="max-w-[400px]">
        <h1 class="font-semibold text-2xl _c07 mb-7">Crop new cover photo</h1>
        <img id="image" :src="isLoading.store.previewImage" alt="">
        <br>
        <button @click="cropperImage" class="uppercase h-10 px-6 rounded-lg w-full b_cbc _c07">
            Save
        </button>
    </div>
</template>

<script setup>
import { useLoadingStore, useSettingsStore } from '@/store';

const isLoading = useLoadingStore();
const useSettings = useSettingsStore();
const router = useRouter();
const store = reactive({
    cropper: "",
})
function cropperImage() {
    // Get cropped canvas data
    try {
        var canvas = store.cropper.getCroppedCanvas();

        // Convert canvas to data URL
        var dataURL = canvas.toDataURL();

        isLoading.store.croppedImage = dataURL;
        isLoading.store.croppedFile = base64ToFile(dataURL, "upload.jpg")
        isLoading.store.cropModal = false;
        isLoading.user_update_checker.image = isLoading.store.croppedFile;
        if (router.currentRoute.value.name == 'settings') {
            useSettings.updateUserImage();
        }
    } catch (_) { }
}

function base64ToFile(base64Url, filename) {
    // Convert base64 to bytes
    try {
        const byteCharacters = atob(base64Url.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create Blob from bytes
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        // Create File from Blob
        return new File([blob], filename, { type: 'image/jpeg' });
    } catch (_) {

    }
}

function cropperWrap() {
    try {
        var image = document.getElementById('image');
        store.cropper = new Cropper(image, {
            // aspectRatio: 1 / 1, // Aspect ratio for the crop box
            height: "10px",
            // viewMode: "400px", // Display mode (0: none, 1: fit, 2: fill, 3: contain, 4: cover)
            crop: function () {
                // Callback function triggered after cropping
                // console.log(event.detail.x);
                // console.log(event.detail.y);
                // console.log(event.detail.width);
                // console.log(event.detail.height);
                // console.log(event.detail.rotate);
                // console.log(event.detail.scaleX);
                // console.log(event.detail.scaleY);
            },
        });
    } catch (_) {

    }
}

onMounted(() => {
    cropperWrap();
})
</script>

<style lang="scss" scoped></style>