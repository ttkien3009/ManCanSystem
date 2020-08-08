const DetailProfile = {
  data() {
    return {
      managerId: null,
      candidateId: null,
      companionId: null,
      spiritualGuideId: null,
      teacherId: null,
      fullName: null,
      christianName: null,
      birthday: null,
      phone: null,
      phoneEdit: null,
      email: null,
      emailEdit: null,
      image: null,
      position: 0,
      status: 0,
      community: 0,
      subject: 0,
      gender: 0,
      genders: [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" },
      ],
      homeland: null,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      titleHomeland: "Nhập thông tin quê quán",
      checkEmail: false,
      checkPhone: false,
      groupCommunity: 0,
      role: 0,
      idTable: 0,
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        const userInfo = {
          id: resp.data.id,
          userId: resp.data.userId,
          username: resp.data.username,
          password: crypt.decrypt(resp.data.password),
          role: resp.data.role,
          idTable: resp.data.idTable,
        };
        this.role = resp.data.role;
        this.idTable = resp.data.idTable;
        if (
          this.role == 1 ||
          this.role == 2 ||
          this.role == 3 ||
          this.role == 4
        ) {
          axios
            .get(
              "http://localhost:3000/api/managers/getManager?id=" + this.idTable
            )
            .then((response) => {
              this.managerId = response.data.manager.managerId;
              this.christianName = response.data.manager.christianName;
              this.fullName = response.data.manager.fullName;
              this.birthday = crypt.formatDate(response.data.manager.birthday);
              this.position = response.data.manager.position;
              this.homeland = response.data.manager.homeland;
              this.phone = response.data.manager.phone;
              this.phoneEdit = response.data.manager.phone;
              this.email = response.data.manager.email;
              this.emailEdit = response.data.manager.email;
              this.status = response.data.manager.status;
            });
        }
        if (this.role == 5) {
          axios
            .get(
              "http://localhost:3000/api/candidates/getCandidate?id=" +
                this.idTable
            )
            .then((response) => {
              this.candidateId = response.data.candidate.candidateId;
              this.christianName = response.data.candidate.christianName;
              this.fullName = response.data.candidate.fullName;
              this.birthday = crypt.formatDate(
                response.data.candidate.birthday
              );
              this.position = response.data.candidate.position;
              this.homeland = response.data.candidate.homeland;
              this.phone = response.data.candidate.phone;
              this.phoneEdit = response.data.candidate.phone;
              this.email = response.data.candidate.email;
              this.emailEdit = response.data.candidate.email;
              this.status = response.data.candidate.status;
              this.community = response.data.candidate.community;
              this.communityEdit = response.data.candidate.community;
            });
        }
        if (this.role == 6 || this.role == 7) {
          axios
            .get(
              "http://localhost:3000/api/spiritualGuides/getSpiritualGuide?id=" +
                this.idTable
            )
            .then((response) => {
              this.spiritualGuideId =
                response.data.spiritualGuide.spiritualGuideId;
              this.christianName = response.data.spiritualGuide.christianName;
              this.fullName = response.data.spiritualGuide.fullName;
              this.birthday = crypt.formatDate(
                response.data.spiritualGuide.birthday
              );
              this.position = response.data.spiritualGuide.position;
              this.homeland = response.data.spiritualGuide.homeland;
              this.phone = response.data.spiritualGuide.phone;
              this.phoneEdit = response.data.spiritualGuide.phone;
              this.email = response.data.spiritualGuide.email;
              this.emailEdit = response.data.spiritualGuide.email;
              this.status = response.data.spiritualGuide.status;
              this.groupCommunity = response.data.spiritualGuide.groupCommunity;
            });
        }
        if (this.role == 8 || this.role == 9) {
          axios
            .get(
              "http://localhost:3000/api/spiritualGuides/getSpiritualGuide?id=" +
                this.idTable
            )
            .then((response) => {
              this.spiritualGuideId =
                response.data.spiritualGuide.spiritualGuideId;
              this.christianName = response.data.spiritualGuide.christianName;
              this.fullName = response.data.spiritualGuide.fullName;
              this.birthday = crypt.formatDate(
                response.data.spiritualGuide.birthday
              );
              this.position = response.data.spiritualGuide.position;
              this.homeland = response.data.spiritualGuide.homeland;
              this.phone = response.data.spiritualGuide.phone;
              this.phoneEdit = response.data.spiritualGuide.phone;
              this.email = response.data.spiritualGuide.email;
              this.emailEdit = response.data.spiritualGuide.email;
              this.status = response.data.spiritualGuide.status;
              this.groupCommunity = response.data.spiritualGuide.groupCommunity;
            });
        }
        if (this.role == 10) {
          axios
            .get(
              "http://localhost:3000/api/teachers/getTeacher?id=" + this.idTable
            )
            .then((response) => {
              this.teacherId = response.data.teacher.teacherId;
              this.gender = response.data.teacher.gender;
              this.fullName = response.data.teacher.fullName;
              this.birthday = crypt.formatDate(response.data.teacher.birthday);
              this.subject = response.data.teacher.subject;
              this.phone = response.data.teacher.phone;
              this.phoneEdit = response.data.teacher.phone;
              this.email = response.data.teacher.email;
              this.emailEdit = response.data.teacher.email;
              this.status = response.data.teacher.status;
            });
        }
      });
  },
  computed: {
    fullNameIsValid() {
      return !!this.fullName;
    },

    christianNameIsValid() {
      return !!this.christianName;
    },

    genderIsValid() {
      return !!this.gender;
    },

    birthdayIsValid() {
      return !!this.birthday;
    },

    phoneIsValid() {
      return !!this.phone;
    },

    emailIsValid() {
      return !!this.email;
    },

    checkFormatPhone() {
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      this.checkPhone = vnf_regex.test(this.phone);
      return !!this.phoneIsValid && !this.checkPhone;
    },

    checkFormatEmail() {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      this.checkEmail = filter.test(this.email);
      return !!this.emailIsValid && !this.checkEmail;
    },

    homelandIsValid() {
      return !!this.homeland;
    },

    editProfileFormIsValid() {
      return (
        this.christianNameIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.homelandIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail
      );
    },

    editProfileFormWithTeacherIsValid() {
      return (
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.genderIsValid &&
        this.emailIsValid &&
        this.homelandIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail
      );
    },

    refreshFormEditProfile() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid
      );
    },

    refreshFormEditProfilewithTeacher() {
      return (
        this.genderIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.birthdayIsValid
      );
    },
  },
  methods: {
    submitEditProfileForm() {
      if (
        this.role == 1 ||
        this.role == 2 ||
        this.role == 3 ||
        this.role == 4
      ) {
        if (this.editProfileFormIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 28) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người quản lý nhỏ hơn 28!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 60) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người quản lý lớn hơn 60!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const manager = {
                managerId: this.managerId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                homeland: this.homeland,
                position: this.position,
                phone: this.phone,
                email: this.email,
                status: this.status,
                id: this.idTable,
              };
              const url =
                "http://localhost:3000/api/managers/" + manager.id + "/replace";
              axios.post(url, manager);
              this.$router.push("/");
              location.reload();
              return 0;
            }
          } else if (
            this.emailEdit != this.email &&
            this.phoneEdit == this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/managers/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người quản lý nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người quản lý lớn hơn 60!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const manager = {
                    managerId: this.managerId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    homeland: this.homeland,
                    position: this.position,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  this.$router.push("/");
                  location.reload();
                  return 0;
                }
              });
          } else if (
            this.emailEdit == this.email &&
            this.phoneEdit != this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/managers/existsPhone?phone=" +
                  this.phone
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert(
                    "Thông báo",
                    "Số điện thoại đã tồn tại!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người quản lý nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người quản lý lớn hơn 60!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const manager = {
                    managerId: this.managerId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    homeland: this.homeland,
                    position: this.position,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  this.$router.push("/");
                  location.reload();
                  return 0;
                }
              });
          } else {
            axios
              .get(
                "http://localhost:3000/api/managers/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else {
                  axios
                    .get(
                      "http://localhost:3000/api/managers/existsPhone?phone=" +
                        this.phone
                    )
                    .then((resp) => {
                      if (resp.data.bool == true) {
                        alertify.alert(
                          "Thông báo",
                          "Số điện thoại đã tồn tại!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) < 28) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người quản lý nhỏ hơn 28!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 60) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người quản lý lớn hơn 60!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else {
                        const manager = {
                          managerId: this.managerId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          homeland: this.homeland,
                          position: this.position,
                          phone: this.phone,
                          email: this.email,
                          status: this.status,
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/managers/" +
                          manager.id +
                          "/replace";
                        axios.post(url, manager);
                        this.$router.push("/");
                        location.reload();
                        return 0;
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
      if (this.role == 5) {
        if (this.editProfileFormIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 18) {
              alertify.alert(
                "Thông báo",
                "Tuổi của ứng sinh nhỏ hơn 18!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 30) {
              alertify.alert(
                "Thông báo",
                "Tuổi của ứng sinh lớn hơn 30!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const candidate = {
                candidateId: this.candidateId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                position: this.position,
                homeland: this.homeland,
                phone: this.phone,
                email: this.email,
                status: this.status,
                community: this.community,
                id: this.idTable,
              };
              const url =
                "http://localhost:3000/api/candidates/" +
                candidate.id +
                "/replace";
              axios.post(url, candidate);
              setTimeout(() => {
                this.$router.push("/");
                location.reload();
              }, 500);
              return 0;
            }
          } else if (
            this.emailEdit != this.email &&
            this.phoneEdit == this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/candidates/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else if (crypt.getAge(this.birthday) < 18) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của ứng sinh nhỏ hơn 18!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 30) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của ứng sinh lớn hơn 30!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const candidate = {
                    candidateId: this.candidateId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    position: this.position,
                    homeland: this.homeland,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    community: this.community,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/candidates/" +
                    candidate.id +
                    "/replace";
                  axios.post(url, candidate);
                  setTimeout(() => {
                    this.$router.push("/");
                    location.reload();
                  }, 100);
                  return 0;
                }
              });
          } else if (
            this.emailEdit == this.email &&
            this.phoneEdit != this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/candidates/existsPhone?phone=" +
                  this.phone
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert(
                    "Thông báo",
                    "Số điện thoại đã tồn tại!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) < 18) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của ứng sinh nhỏ hơn 18!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 30) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của ứng sinh lớn hơn 30!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const candidate = {
                    candidateId: this.candidateId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    position: this.position,
                    homeland: this.homeland,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    community: this.community,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/candidates/" +
                    candidate.id +
                    "/replace";
                  axios.post(url, candidate);
                  setTimeout(() => {
                    this.$router.push("/");
                    location.reload();
                  }, 100);
                  return 0;
                }
              });
          } else {
            axios
              .get(
                "http://localhost:3000/api/candidates/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else {
                  axios
                    .get(
                      "http://localhost:3000/api/candidates/existsPhone?phone=" +
                        this.phone
                    )
                    .then((resp) => {
                      if (resp.data.bool == true) {
                        alertify.alert(
                          "Thông báo",
                          "Số điện thoại đã tồn tại!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) < 18) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của ứng sinh nhỏ hơn 18!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 30) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của ứng sinh lớn hơn 30!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else {
                        const candidate = {
                          candidateId: this.candidateId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          position: this.position,
                          homeland: this.homeland,
                          phone: this.phone,
                          email: this.email,
                          status: this.status,
                          community: this.community,
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          candidate.id +
                          "/replace";
                        axios.post(url, candidate);
                        setTimeout(() => {
                          this.$router.push("/");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert("Thông báo", "cập nhật liệu thất bại!", function () {
            alertify.success("Ok");
          });
        }
      }
      if (this.role == 6 || this.role == 7) {
        if (this.editProfileFormIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 28) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người linh hướng nhỏ hơn 28!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 60) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người linh hướng lớn hơn 60!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const spiritualGuide = {
                spiritualGuideId: this.spiritualGuideId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                position: this.position,
                homeland: this.homeland,
                phone: this.phone,
                email: this.email,
                status: this.status,
                groupCommunity: this.groupCommunity,
                id: this.idTable,
              };
              const url =
                "http://localhost:3000/api/spiritualGuides/" +
                spiritualGuide.id +
                "/replace";
              axios.post(url, spiritualGuide);
              setTimeout(() => {
                this.$router.push("/");
                location.reload();
              }, 100);
              return 0;
            }
          } else if (
            this.emailEdit != this.email &&
            this.phoneEdit == this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/spiritualGuides/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người linh hướng nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người linh hướng lớn hơn 60!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const spiritualGuide = {
                    spiritualGuideId: this.spiritualGuideId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    position: this.position,
                    homeland: this.homeland,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    groupCommunity: this.groupCommunity,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/spiritualGuides/" +
                    spiritualGuide.id +
                    "/replace";
                  axios.post(url, spiritualGuide);
                  setTimeout(() => {
                    this.$router.push("/");
                    location.reload();
                  }, 100);
                  return 0;
                }
              });
          } else if (
            this.emailEdit == this.email &&
            this.phoneEdit != this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/spiritualGuides/existsPhone?phone=" +
                  this.phone
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert(
                    "Thông báo",
                    "Số điện thoại đã tồn tại!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người linh hướng nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người linh hướng lớn hơn 60!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const spiritualGuide = {
                    spiritualGuideId: this.spiritualGuideId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    position: this.position,
                    homeland: this.homeland,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    groupCommunity: this.groupCommunity,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/spiritualGuides/" +
                    spiritualGuide.id +
                    "/replace";
                  axios.post(url, spiritualGuide);
                  setTimeout(() => {
                    this.$router.push("/");
                    location.reload();
                  }, 100);
                  return 0;
                }
              });
          } else {
            axios
              .get(
                "http://localhost:3000/api/spiritualGuides/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else {
                  axios
                    .get(
                      "http://localhost:3000/api/spiritualGuides/existsPhone?phone=" +
                        this.phone
                    )
                    .then((resp) => {
                      if (resp.data.bool == true) {
                        alertify.alert(
                          "Thông báo",
                          "Số điện thoại đã tồn tại!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) < 28) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người linh hướng nhỏ hơn 28!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 60) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người linh hướng lớn hơn 60!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else {
                        const spiritualGuide = {
                          spiritualGuideId: this.spiritualGuideId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          position: this.position,
                          homeland: this.homeland,
                          phone: this.phone,
                          email: this.email,
                          status: this.status,
                          groupCommunity: this.groupCommunity,
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/spiritualGuides/" +
                          spiritualGuide.id +
                          "/replace";
                        axios.post(url, spiritualGuide);
                        setTimeout(() => {
                          this.$router.push("/");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
      if (this.role == 8 || this.role == 9) {
        if (this.editProfileFormIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 28) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người đồng hành nhỏ hơn 28!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 60) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người đồng hành lớn hơn 60!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const companion = {
                companionId: this.companionId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                position: this.position,
                homeland: this.homeland,
                phone: this.phone,
                email: this.email,
                status: this.status,
                groupCommunity: this.groupCommunity,
                id: this.idTable,
              };
              const url =
                "http://localhost:3000/api/companions/" +
                companion.id +
                "/replace";
              axios.post(url, companion);
              setTimeout(() => {
                this.$router.push("/");
                location.reload();
              }, 100);
              return 0;
            }
          } else if (
            this.emailEdit != this.email &&
            this.phoneEdit == this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/companions/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành lớn hơn 60!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const companion = {
                    companionId: this.companionId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    position: this.position,
                    homeland: this.homeland,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    groupCommunity: this.groupCommunity,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/companions/" +
                    companion.id +
                    "/replace";
                  axios.post(url, companion);
                  setTimeout(() => {
                    this.$router.push("/");
                    location.reload();
                  }, 100);
                  return 0;
                }
              });
          } else if (
            this.emailEdit == this.email &&
            this.phoneEdit != this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/companions/existsPhone?phone=" +
                  this.phone
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert(
                    "Thông báo",
                    "Số điện thoại đã tồn tại!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành lớn hơn 60!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  const companion = {
                    companionId: this.companionId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    position: this.position,
                    homeland: this.homeland,
                    phone: this.phone,
                    email: this.email,
                    status: this.status,
                    groupCommunity: this.groupCommunity,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/companions/" +
                    companion.id +
                    "/replace";
                  axios.post(url, companion);
                  setTimeout(() => {
                    this.$router.push("/");
                    location.reload();
                  }, 100);
                  return 0;
                }
              });
          } else {
            axios
              .get(
                "http://localhost:3000/api/companions/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else {
                  axios
                    .get(
                      "http://localhost:3000/api/companions/existsPhone?phone=" +
                        this.phone
                    )
                    .then((resp) => {
                      if (resp.data.bool == true) {
                        alertify.alert(
                          "Thông báo",
                          "Số điện thoại đã tồn tại!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) < 28) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người đồng hành nhỏ hơn 28!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 60) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người đồng hành lớn hơn 60!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else {
                        const companion = {
                          companionId: this.companionId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          position: this.position,
                          homeland: this.homeland,
                          phone: this.phone,
                          email: this.email,
                          status: this.status,
                          groupCommunity: this.groupCommunity,
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/companions/" +
                          companion.id +
                          "/replace";
                        axios.post(url, companion);
                        setTimeout(() => {
                          this.$router.push("/");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
      if (this.role == 10) {
        if (this.editProfileFormWithTeacherIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 25) {
              alertify.alert(
                "Thông báo",
                "Tuổi giáo viên nhỏ hơn 25!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 50) {
              alertify.alert(
                "Thông báo",
                "Tuổi giáo viên lớn hơn 50!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const teacher = {
                teacherId: this.teacherId,
                gender: this.gender,
                fullName: this.fullName,
                birthday: this.birthday,
                subject: this.subject,
                phone: this.phone,
                email: this.email,
                status: this.status,
                id: this.idTable,
              };
              const url =
                "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
              axios.post(url, teacher);
              setTimeout(() => {
                this.$router.push("/");
                location.reload();
              }, 100);
              return 0;
            }
          } else if (
            this.emailEdit != this.email &&
            this.phoneEdit == this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/teachers/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else {
                  if (crypt.getAge(this.birthday) < 25) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi giáo viên nhỏ hơn 25!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if (crypt.getAge(this.birthday) > 50) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi giáo viên lớn hơn 50!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else {
                    const teacher = {
                      teacherId: this.teacherId,
                      gender: this.gender,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      subject: this.subject,
                      phone: this.phone,
                      email: this.email,
                      status: this.status,
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/teachers/" +
                      teacher.id +
                      "/replace";
                    axios.post(url, teacher);
                    setTimeout(() => {
                      this.$router.push("/");
                      location.reload();
                    }, 100);
                    return 0;
                  }
                }
              });
          } else if (
            this.emailEdit == this.email &&
            this.phoneEdit != this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/teachers/existsPhone?phone=" +
                  this.phone
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert(
                    "Thông báo",
                    "Số điện thoại đã tồn tại!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  if (crypt.getAge(this.birthday) < 25) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi giáo viên nhỏ hơn 25!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if (crypt.getAge(this.birthday) > 50) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi giáo viên lớn hơn 50!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else {
                    const teacher = {
                      teacherId: this.teacherId,
                      gender: this.gender,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      subject: this.subject,
                      phone: this.phone,
                      email: this.email,
                      status: this.status,
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/teachers/" +
                      teacher.id +
                      "/replace";
                    axios.post(url, teacher);
                    setTimeout(() => {
                      this.$router.push("/");
                      location.reload();
                    }, 100);
                    return 0;
                  }
                }
              });
          } else {
            axios
              .get(
                "http://localhost:3000/api/teachers/existsEmail?email=" +
                  this.email
              )
              .then((response) => {
                if (response.data.bool == true) {
                  alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                    alertify.success("Ok");
                  });
                } else {
                  axios
                    .get(
                      "http://localhost:3000/api/teachers/existsPhone?phone=" +
                        this.phone
                    )
                    .then((resp) => {
                      if (resp.data.bool == true) {
                        alertify.alert(
                          "Thông báo",
                          "Số điện thoại đã tồn tại!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else {
                        if (crypt.getAge(this.birthday) < 25) {
                          alertify.alert(
                            "Thông báo",
                            "Tuổi giáo viên nhỏ hơn 25!",
                            function () {
                              alertify.success("Ok");
                            }
                          );
                        } else if (crypt.getAge(this.birthday) > 50) {
                          alertify.alert(
                            "Thông báo",
                            "Tuổi giáo viên lớn hơn 50!",
                            function () {
                              alertify.success("Ok");
                            }
                          );
                        } else {
                          const teacher = {
                            teacherId: this.teacherId,
                            gender: this.gender,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            subject: this.subject,
                            phone: this.phone,
                            email: this.email,
                            status: this.status,
                            id: this.idTable,
                          };
                          const url =
                            "http://localhost:3000/api/teachers/" +
                            teacher.id +
                            "/replace";
                          axios.post(url, teacher);
                          setTimeout(() => {
                            this.$router.push("/");
                            location.reload();
                          }, 100);
                          return 0;
                        }
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
    },

    clearInputEditProfileForm() {
      if (this.christianNameIsValid) {
        this.christianName = null;
      }
      if (this.fullNameIsValid) {
        this.fullName = null;
      }
      if (this.phoneIsValid) {
        this.phone = null;
      }
      if (this.emailIsValid) {
        this.email = null;
      }
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
      if (this.homelandIsValid) {
        this.homeland = null;
      }
    },

    clearInputEditProfileFormWithTeacher() {
      if (this.genderIsValid) {
        this.gender = 0;
      }
      if (this.fullNameIsValid) {
        this.fullName = null;
      }
      if (this.phoneIsValid) {
        this.phone = null;
      }
      if (this.emailIsValid) {
        this.email = null;
      }
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
    },

    toHome() {
      this.$router.push("/");
      location.reload();
    },

    onFileSelected(event) {
      var selectedFile = event.target.files[0];
      var reader = new FileReader();
      var imgtag = document.getElementById("image");
      imgtag.title = selectedFile.name;
      reader.onload = function (event) {
        imgtag.src = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Thông Tin Cá Nhân</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditProfileForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <div class="text-center">
              <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
              src="../images/user_02.png" alt="User Image">
            </div>
            <div class="row">
              <div class="col-sm-12 text-center mt-2">
                <span class="font-weight-bold" style="font-size: large;">{{ fullName }}</span>
              </div>
              <div class="col-sm-12 text-center mt-1 cl-darkgrey">
                <span v-show="role == 1 || role == 2 || role == 3 || role == 4">{{ managerId }}</span>
                <span v-show="role == 5">{{ candidateId }}</span>
                <span v-show="role == 6 || role == 7">{{ spiritualGuideId }}</span>
                <span v-show="role == 8 || role == 9">{{ companionId }}</span>
                <span v-show="role == 10">{{ teacherId }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
            :value="fullName" v-on:keyup="fullName = $event.target.value"
            class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
            <label class="text-size-15px font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
            <label class="text-danger">*</label>
            <input type="text" :title="titleChristianName" name="christianName" id="christianName"
              v-model="christianName" :value="christianName" v-on:keyup="christianName = $event.target.value" 
              class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
              style="margin-top: -5px;">
          </div>
          <div class="col-lg-4" v-show="role == 10">
            <label class="text-size-15px font-weight-bold col-form-label" for="gender">Giới Tính</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="gender" name="gender"
              id="gender" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Giới Tính ---</option>
              <option v-for="gender in genders" v-bind:value="gender.id" :selected="teacher.gender == gender.id">{{ gender.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
            :value="birthday" v-on:keyup="birthday = $event.target.value"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
            :value="homeland" v-on:keyup="homeland = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
          </div>
        </div>
        <div class="row" v-show="role == 10">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
            :value="birthday" v-on:keyup="birthday = $event.target.value"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" v-model="image" name="image" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" @input="onFileSelected(event)"/>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" :value="phone" v-on:keyup="phone = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="email">Email</label>
            <label class="text-danger">*</label>
            <input v-model="email" name="email" id="email" type="text" :title="titleEmail"
            :value="email" v-on:keyup="email = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Địa chỉ email..."
              style="margin-top: -5px;">
            <span v-if="checkFormatEmail" class="text-danger text-size-13px">Địa chỉ email không hợp
              lệ</span>
          </div>
        </div>
        <div class="row mt-1" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" v-model="image" name="image" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" @input="onFileSelected(event)"/>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
              <button :disabled="!editProfileFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right" v-show="role == 10">
              <button :disabled="!editProfileFormWithTeacherIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
              <button :disabled="!refreshFormEditProfile" @click="clearInputEditProfileForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 10px;" v-show="role == 10">
              <button :disabled="!refreshFormEditProfilewithTeacher" @click="clearInputEditProfileFormWithTeacher"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toHome">
                <i class="fas fa-fast-backward"></i>
                &nbsp;Quay lại
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
};