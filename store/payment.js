import { defineStore } from "pinia";
import { useLoadingStore, useGroupStore, useMemberStore, useSettingsStore } from "@/store";
import creditCardType from "credit-card-type";
import axios from "axios";

export const usePaymentStore = defineStore("payment", () => {
  const isLoading = useLoadingStore();
  const useGroup = useGroupStore();
  const useMember = useMemberStore();
  const useSettings = useSettingsStore();
  isLoading.checkCurrentUrl();
  const router = useRouter();
  let lang = {};

  const store = reactive({
    join_step: 1,
    reactive_step: 1,
    code: "",
    payment_check: "",
    payment_phone: "",
    joinToGroupModal: false,
    verifysms: false,
    reactive: false,
    cardType: {
      type: "",
    },
    payment_error: "",
  });

  const card = reactive({
    cardNumber: "",
    expiryDate: "",
    cardName: "",
    cvc: "",
    group_username: null,
  });

  const creategroup = reactive({
    cardNumber: "",
    expiryDate: "",
    cardName: "",
    cvc: "",
    group_username: null,
  });

  function clearCard() {
    for (let i in card) {
      card[i] = "";
    }
    for (let i in creategroup) {
      creategroup[i] = "";
    }
    store.code = "";
    store.cardType.type = "";
    store.payment_phone = "";
    creategroup.group_username = null;
    card.group_username = null;
    store.payment_error = null;
  }

  function getCardType() {
    card.cardNumber = card.cardNumber.replace(/[a-zA-Z]/g, "");
    const cleaned = card.cardNumber.replace(/\D/g, "");

    // Define regex patterns for different card types
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      uzcard: /^8600\d{12}$/,
      humo: /^9860\d{12}$/,
    };

    // Check card type
    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cleaned)) {
        store.cardType.type = type;
        card.cardNumber = prettyCardNumber(card.cardNumber);
        return type;
      }
    }
    store.cardType.type = "";

    // If no match, return 'unknown'
    return "unknown";
  }

  function prettyCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, "");

    // Group digits in blocks of 4
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();

    return formatted;
  }

  function prettyCardExpiryDate(e) {
    if (
      e.inputType === "deleteContentBackward" ||
      e.inputType === "deleteContentForward"
    ) {
      return;
    }
    const cleaned = card.expiryDate.replace(/\D/g, "");
    const formatted = cleaned.replace(/(.{2})/g, "$1/").trim();
    card.expiryDate = formatted.slice(0, 5);
  }

  function prettyCardCvc(e) {
    if (
      e.inputType === "deleteContentBackward" ||
      e.inputType === "deleteContentForward"
    ) {
      return;
    }
    card.cvc = String(card.cvc).slice(0, 3);
  }

  function joinToGroup() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("payment");
    card.group_username = username;
    card.cardName = store.cardType?.type;
    let expiryDate = card.expiryDate.split("/").reverse().join("");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = "pay/join-group/visa-mastercard/step1";
    } else {
      url = "pay/join-group/uzcard-humo/step1";
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        { ...card, expiryDate },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.payment_phone = res.data.smsNotificationNumber;
        store.join_step = 2;
        isLoading.removeLoading("payment");
      })
      .catch((err) => {
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        console.log(err);
        isLoading.removeLoading("payment");
      });
  }

  function createGroup() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("payment");
    // card.group_username = username;
    card.cardName = store.cardType?.type;
    let expiryDate = card.expiryDate.split("/").reverse().join("");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = "pay/create-group/visa-mastercard/request-sms-code";
    } else {
      url = "pay/create-group/uzcard-humo/request-sms-code";
    }

    card.group_username = creategroup.group_username;
    for (let i in card) {
      creategroup[i] = card[i];
    }

    axios
      .post(
        isLoading.store.baseUrl + url,
        { ...creategroup, expiryDate },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.payment_phone = res.data.smsNotificationNumber;
        store.verifysms = true;
        isLoading.removeLoading("payment");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("payment");
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
      });
  }

  function updatePaymentHistory() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("updatePaymentHistory");
    // card.group_username = username;
    card.cardName = store.cardType?.type;
    let expiryDate = card.expiryDate.split("/").reverse().join("");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = "settings/visa-mastercard/payment-method/update";
    } else {
      url = "settings/uzcard-humo/payment-method/update";
    }

    card.group_username = creategroup.group_username;
    for (let i in card) {
      creategroup[i] = card[i];
    }

    axios
      .post(
        isLoading.store.baseUrl + url,
        { ...creategroup, expiryDate },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        isLoading.removeLoading("updatePaymentHistory");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updatePaymentHistory");
      });
  }

  function verifySmsCode(type) {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("payment");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = `pay/create-group/visa-mastercard/verify-sms-code`;
    } else {
      url = `pay/create-group/uzcard-humo/verify-sms-code`;
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        {
          code: store.code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.verifysms = false;
        isLoading.removeLoading("payment");
        if (type == "create-group") {
          useGroup.create_community();
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        console.log(err);
        isLoading.removeLoading("payment");
      });
  }

  function reactiveGroup() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("payment");
    card.group_username = username;
    card.cardName = store.cardType?.type;
    let expiryDate = card.expiryDate.split("/").reverse().join("");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = "pay/reactive-group/visa-mastercard/step1";
    } else {
      url = "pay/reactive-group/uzcard-humo/step1";
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        { ...card, expiryDate },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.payment_phone = res.data.smsNotificationNumber;
        store.join_step = 2;
        isLoading.removeLoading("payment");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        isLoading.removeLoading("payment");
      });
  }

  function updatePaymentCard1() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("updatePaymentCard");
    card.group_username = username;
    card.cardName = store.cardType?.type;
    let expiryDate = card.expiryDate.split("/").reverse().join("");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = "settings/visa-mastercard/request-sms-code";
    } else {
      url = "settings/uzcard-humo/request-sms-code";
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        { ...card, expiryDate },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.payment_phone = res.data.smsNotificationNumber;
        store.join_step = 2;
        isLoading.removeLoading("updatePaymentCard");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        isLoading.removeLoading("updatePaymentCard");
      });
  }

  function updatePaymentCard2() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("updatePaymentCard");
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = "settings/visa-mastercard/payment-method/update";
    } else {
      url = "settings/uzcard-humo/payment-method/update";
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        { code: store.code },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.join_step = 1;
        // Members modal info belling
        useMember.store.updatePayment = 'payment'
        useMember.getBilling();
        useSettings.store.addCartModal = false;
        clearCard();
        useSettings.getPaymentMethod();
        isLoading.removeLoading("updatePaymentCard");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        isLoading.removeLoading("updatePaymentCard");
      });
  }

  function paymentConfirmData(type) {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const group_username = router.currentRoute.value.params.community;
    // const cardToken = localStorage.getItem("payment_token");
    const token = localStorage.getItem("token");
    isLoading.addLoading("paymentConfirm");

    if (type) {
      type = "join-group";
    }
    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = `pay/${type}/visa-mastercard/step2`;
    } else {
      url = `pay/${type}/uzcard-humo/step2`;
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        {
          // cardToken,
          code: store.code,
          group_username,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.joinToGroupModal = false;
        // window.open(res.data.data.gnkFields.qrcodeUrl, "_blank");
        isLoading.removeLoading("paymentConfirm");
        if (type == "join-group") {
          if (
            [
              "To‘lov muvaffaqiyatli amalga oshirildi",
              "Оплата прошла успешно",
              "Payment was made successfully",
            ].includes(res.data?.message)
          ) {
            useGroup.store.group_by_username.status = "active";
            // useGroup.modal.pending = true;
          } else {
            useGroup.store.group_by_username.status = null;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        isLoading.removeLoading("payment");
      });
  }

  function reactiveConfirmData() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const group_username = router.currentRoute.value.params.community;
    // const cardToken = localStorage.getItem("payment_token");
    const token = localStorage.getItem("token");
    isLoading.addLoading("reactiveConfirm");

    let url;
    if (card.cardName == "visa" || card.cardName == "mastercard") {
      url = `pay/reactive-group/uzcard-humo/step2`;
    } else {
      url = `pay/reactive-group/uzcard-humo/step2`;
    }
    axios
      .post(
        isLoading.store.baseUrl + url,
        {
          // cardToken,
          code: store.code,
          group_username,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.payment_error = "";
        store.reactive = false;
        useGroup.store.group_by_username.is_paid = "paid";
        useMembers.store.is_paid = false;
        isLoading.removeLoading("reactiveConfirm");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.payment_error = err.response.data.message;
        } else {
          store.payment_error = err.response.data.errors[0];
        }
        isLoading.removeLoading("reactiveConfirm");
      });
  }

  return {
    store,
    card,
    creategroup,
    joinToGroup,
    createGroup,
    reactiveGroup,
    reactiveConfirmData,
    paymentConfirmData,
    getCardType,
    prettyCardExpiryDate,
    prettyCardCvc,
    verifySmsCode,
    clearCard,
    updatePaymentHistory,
    updatePaymentCard1,
    updatePaymentCard2,
  };
});
