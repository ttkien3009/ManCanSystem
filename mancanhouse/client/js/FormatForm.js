submitEditManagerForm() {
  if (this.editManagerFormIsValid) {
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
        if (this.selectedFile != null) {
          const fd = new FormData();
          fd.append("image", this.selectedFile, this.selectedFile.name);
          var start = this.selectedFile.name.lastIndexOf(".");
          var end = this.selectedFile.length;
          var fileName =
            this.managerId + this.selectedFile.name.slice(start, end);
          if (this.imageEdit != null) {
            const manager = {
              managerId: this.managerId,
              christianName: this.christianName,
              fullName: this.fullName,
              birthday: this.birthday,
              phone: this.phone,
              email: this.email,
              image: fileName,
              position: this.position,
              homeland: this.homeland,
              status: this.status,
              id: this.$route.params.id,
            };
            if (manager.status == 2) {
              axios
                .get(
                  "http://localhost:3000/api/managers?filter[where][id]=" +
                    this.$route.params.id
                )
                .then((respMan) => {
                  axios
                    .get(
                      "http://localhost:3000/api/departments?filter[where][id]=" +
                        respMan.data[0].position
                    )
                    .then((respPos) => {
                      if (respPos.data[0].positionType == "Giám đốc") {
                        axios
                          .get(
                            "http://localhost:3000/api/roles?filter[where][roleName]=" +
                              "Giám đốc"
                          )
                          .then((respRole) => {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][role]=" +
                                  respRole.data[0].id
                              )
                              .then((respAcc) => {
                                const account = {
                                  userId: respAcc.data[0].userId,
                                  username: respAcc.data[0].username,
                                  password: respAcc.data[0].password,
                                  role: respAcc.data[0].role,
                                  status: 2,
                                  idTable: respAcc.data[0].idTable,
                                  id: respAcc.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/managers/" +
                                  manager.id +
                                  "/replace";
                                axios.post(url, manager);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/manager/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/managers");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          });
                      } else if (
                        respPos.data[0].positionType == "Quản lý"
                      ) {
                        axios
                          .get(
                            "http://localhost:3000/api/roles?filter[where][roleName]=" +
                              "Quản lý"
                          )
                          .then((respRole) => {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][role]=" +
                                  respRole.data[0].id
                              )
                              .then((respAcc) => {
                                const account = {
                                  userId: respAcc.data[0].userId,
                                  username: respAcc.data[0].username,
                                  password: respAcc.data[0].password,
                                  role: respAcc.data[0].role,
                                  status: 2,
                                  idTable: respAcc.data[0].idTable,
                                  id: respAcc.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/managers/" +
                                  manager.id +
                                  "/replace";
                                axios.post(url, manager);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/manager/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/managers");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          });
                      } else if (
                        respPos.data[0].positionType == "Giám học"
                      ) {
                        axios
                          .get(
                            "http://localhost:3000/api/roles?filter[where][roleName]=" +
                              "Giám học"
                          )
                          .then((respRole) => {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][role]=" +
                                  respRole.data[0].id
                              )
                              .then((respAcc) => {
                                const account = {
                                  userId: respAcc.data[0].userId,
                                  username: respAcc.data[0].username,
                                  password: respAcc.data[0].password,
                                  role: respAcc.data[0].role,
                                  status: 2,
                                  idTable: respAcc.data[0].idTable,
                                  id: respAcc.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/managers/" +
                                  manager.id +
                                  "/replace";
                                axios.post(url, manager);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/manager/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/managers");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          });
                      }
                    });
                });
            } else {
              const url =
                "http://localhost:3000/api/managers/" +
                manager.id +
                "/replace";
              axios.post(url, manager);
              axios
                .delete(
                  "http://localhost:3000/api/Photos/manager/files/" +
                    this.imageEdit
                )
                .then((resp) => {
                  console.log(resp);
                })
                .catch((err) => console.log(err));
              axios
                .post(
                  "http://localhost:3000/api/Photos/manager/upload?filename=" +
                    fileName,
                  fd
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => console.log(err));
              setTimeout(() => {
                this.$router.push("/managers");
                location.reload();
              }, 100);
              return 0;
            }
          } else {
            const manager = {
              managerId: this.managerId,
              christianName: this.christianName,
              fullName: this.fullName,
              birthday: this.birthday,
              phone: this.phone,
              email: this.email,
              image: fileName,
              position: this.position,
              homeland: this.homeland,
              status: this.status,
              id: this.$route.params.id,
            };
            if (manager.status == 2) {
              axios
                .get(
                  "http://localhost:3000/api/managers?filter[where][id]=" +
                    this.$route.params.id
                )
                .then((respMan) => {
                  axios
                    .get(
                      "http://localhost:3000/api/departments?filter[where][id]=" +
                        respMan.data[0].position
                    )
                    .then((respPos) => {
                      if (respPos.data[0].positionType == "Giám đốc") {
                        axios
                          .get(
                            "http://localhost:3000/api/roles?filter[where][roleName]=" +
                              "Giám đốc"
                          )
                          .then((respRole) => {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][role]=" +
                                  respRole.data[0].id
                              )
                              .then((respAcc) => {
                                const account = {
                                  userId: respAcc.data[0].userId,
                                  username: respAcc.data[0].username,
                                  password: respAcc.data[0].password,
                                  role: respAcc.data[0].role,
                                  status: 2,
                                  idTable: respAcc.data[0].idTable,
                                  id: respAcc.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/managers/" +
                                  manager.id +
                                  "/replace";
                                axios.post(url, manager);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/manager/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/managers");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          });
                      } else if (
                        respPos.data[0].positionType == "Quản lý"
                      ) {
                        axios
                          .get(
                            "http://localhost:3000/api/roles?filter[where][roleName]=" +
                              "Quản lý"
                          )
                          .then((respRole) => {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][role]=" +
                                  respRole.data[0].id
                              )
                              .then((respAcc) => {
                                const account = {
                                  userId: respAcc.data[0].userId,
                                  username: respAcc.data[0].username,
                                  password: respAcc.data[0].password,
                                  role: respAcc.data[0].role,
                                  status: 2,
                                  idTable: respAcc.data[0].idTable,
                                  id: respAcc.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/managers/" +
                                  manager.id +
                                  "/replace";
                                axios.post(url, manager);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/manager/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/managers");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          });
                      } else if (
                        respPos.data[0].positionType == "Giám học"
                      ) {
                        axios
                          .get(
                            "http://localhost:3000/api/roles?filter[where][roleName]=" +
                              "Giám học"
                          )
                          .then((respRole) => {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][role]=" +
                                  respRole.data[0].id
                              )
                              .then((respAcc) => {
                                const account = {
                                  userId: respAcc.data[0].userId,
                                  username: respAcc.data[0].username,
                                  password: respAcc.data[0].password,
                                  role: respAcc.data[0].role,
                                  status: 2,
                                  idTable: respAcc.data[0].idTable,
                                  id: respAcc.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/managers/" +
                                  manager.id +
                                  "/replace";
                                axios.post(url, manager);
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/managers");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          });
                      }
                    });
                });
            } else {
              const url =
                "http://localhost:3000/api/managers/" +
                manager.id +
                "/replace";
              axios.post(url, manager);
              axios
                .post(
                  "http://localhost:3000/api/Photos/manager/upload?filename=" +
                    fileName,
                  fd
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => console.log(err));
              setTimeout(() => {
                this.$router.push("/managers");
                location.reload();
              }, 100);
              return 0;
            }
          }
        } else {
          const manager = {
            managerId: this.managerId,
            christianName: this.christianName,
            fullName: this.fullName,
            birthday: this.birthday,
            phone: this.phone,
            email: this.email,
            image: this.imageEdit,
            position: this.position,
            homeland: this.homeland,
            status: this.status,
            id: this.$route.params.id,
          };
          if (manager.status == 2) {
            axios
              .get(
                "http://localhost:3000/api/managers?filter[where][id]=" +
                  this.$route.params.id
              )
              .then((respMan) => {
                axios
                  .get(
                    "http://localhost:3000/api/departments?filter[where][id]=" +
                      respMan.data[0].position
                  )
                  .then((respPos) => {
                    if (respPos.data[0].positionType == "Giám đốc") {
                      axios
                        .get(
                          "http://localhost:3000/api/roles?filter[where][roleName]=" +
                            "Giám đốc"
                        )
                        .then((respRole) => {
                          axios
                            .get(
                              "http://localhost:3000/api/accounts?filter[where][role]=" +
                                respRole.data[0].id
                            )
                            .then((respAcc) => {
                              const account = {
                                userId: respAcc.data[0].userId,
                                username: respAcc.data[0].username,
                                password: respAcc.data[0].password,
                                role: respAcc.data[0].role,
                                status: 2,
                                idTable: respAcc.data[0].idTable,
                                id: respAcc.data[0].id,
                              };
                              const url_5 =
                                "http://localhost:3000/api/accounts/" +
                                account.id +
                                "/replace";
                              axios.post(url_5, account);
                              const url =
                                "http://localhost:3000/api/managers/" +
                                manager.id +
                                "/replace";
                              axios.post(url, manager);
                              setTimeout(() => {
                                this.$router.push("/managers");
                                location.reload();
                              }, 100);
                              return 0;
                            });
                        });
                    } else if (respPos.data[0].positionType == "Quản lý") {
                      axios
                        .get(
                          "http://localhost:3000/api/roles?filter[where][roleName]=" +
                            "Quản lý"
                        )
                        .then((respRole) => {
                          axios
                            .get(
                              "http://localhost:3000/api/accounts?filter[where][role]=" +
                                respRole.data[0].id
                            )
                            .then((respAcc) => {
                              const account = {
                                userId: respAcc.data[0].userId,
                                username: respAcc.data[0].username,
                                password: respAcc.data[0].password,
                                role: respAcc.data[0].role,
                                status: 2,
                                idTable: respAcc.data[0].idTable,
                                id: respAcc.data[0].id,
                              };
                              const url_5 =
                                "http://localhost:3000/api/accounts/" +
                                account.id +
                                "/replace";
                              axios.post(url_5, account);
                              const url =
                                "http://localhost:3000/api/managers/" +
                                manager.id +
                                "/replace";
                              axios.post(url, manager);
                              setTimeout(() => {
                                this.$router.push("/managers");
                                location.reload();
                              }, 100);
                              return 0;
                            });
                        });
                    } else if (respPos.data[0].positionType == "Giám học") {
                      axios
                        .get(
                          "http://localhost:3000/api/roles?filter[where][roleName]=" +
                            "Giám học"
                        )
                        .then((respRole) => {
                          axios
                            .get(
                              "http://localhost:3000/api/accounts?filter[where][role]=" +
                                respRole.data[0].id
                            )
                            .then((respAcc) => {
                              const account = {
                                userId: respAcc.data[0].userId,
                                username: respAcc.data[0].username,
                                password: respAcc.data[0].password,
                                role: respAcc.data[0].role,
                                status: 2,
                                idTable: respAcc.data[0].idTable,
                                id: respAcc.data[0].id,
                              };
                              const url_5 =
                                "http://localhost:3000/api/accounts/" +
                                account.id +
                                "/replace";
                              axios.post(url_5, account);
                              const url =
                                "http://localhost:3000/api/managers/" +
                                manager.id +
                                "/replace";
                              axios.post(url, manager);
                              setTimeout(() => {
                                this.$router.push("/managers");
                                location.reload();
                              }, 100);
                              return 0;
                            });
                        });
                    }
                  });
              });
          } else {
            const url =
              "http://localhost:3000/api/managers/" +
              manager.id +
              "/replace";
            axios.post(url, manager);
            setTimeout(() => {
              this.$router.push("/managers");
              location.reload();
            }, 100);
            return 0;
          }
        }
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
            if (this.selectedFile != null) {
              const fd = new FormData();
              fd.append("image", this.selectedFile, this.selectedFile.name);
              var start = this.selectedFile.name.lastIndexOf(".");
              var end = this.selectedFile.length;
              var fileName =
                this.managerId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                if (manager.status == 2) {
                  axios
                    .get(
                      "http://localhost:3000/api/managers?filter[where][id]=" +
                        this.$route.params.id
                    )
                    .then((respMan) => {
                      axios
                        .get(
                          "http://localhost:3000/api/departments?filter[where][id]=" +
                            respMan.data[0].position
                        )
                        .then((respPos) => {
                          if (respPos.data[0].positionType == "Giám đốc") {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám đốc"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Quản lý"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Quản lý"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Giám học"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám học"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          }
                        });
                    });
                } else {
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  axios
                    .delete(
                      "http://localhost:3000/api/Photos/manager/files/" +
                        this.imageEdit
                    )
                    .then((resp) => {
                      console.log(resp);
                    })
                    .catch((err) => console.log(err));
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/manager/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                  setTimeout(() => {
                    this.$router.push("/managers");
                    location.reload();
                  }, 100);
                  return 0;
                }
              } else {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                if (manager.status == 2) {
                  axios
                    .get(
                      "http://localhost:3000/api/managers?filter[where][id]=" +
                        this.$route.params.id
                    )
                    .then((respMan) => {
                      axios
                        .get(
                          "http://localhost:3000/api/departments?filter[where][id]=" +
                            respMan.data[0].position
                        )
                        .then((respPos) => {
                          if (respPos.data[0].positionType == "Giám đốc") {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám đốc"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Quản lý"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Quản lý"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Giám học"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám học"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          }
                        });
                    });
                } else {
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/manager/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                  setTimeout(() => {
                    this.$router.push("/managers");
                    location.reload();
                  }, 100);
                  return 0;
                }
              }
            } else {
              const manager = {
                managerId: this.managerId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                image: this.imageEdit,
                position: this.position,
                homeland: this.homeland,
                status: this.status,
                id: this.$route.params.id,
              };
              if (manager.status == 2) {
                axios
                  .get(
                    "http://localhost:3000/api/managers?filter[where][id]=" +
                      this.$route.params.id
                  )
                  .then((respMan) => {
                    axios
                      .get(
                        "http://localhost:3000/api/departments?filter[where][id]=" +
                          respMan.data[0].position
                      )
                      .then((respPos) => {
                        if (respPos.data[0].positionType == "Giám đốc") {
                          axios
                            .get(
                              "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                "Giám đốc"
                            )
                            .then((respRole) => {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][role]=" +
                                    respRole.data[0].id
                                )
                                .then((respAcc) => {
                                  const account = {
                                    userId: respAcc.data[0].userId,
                                    username: respAcc.data[0].username,
                                    password: respAcc.data[0].password,
                                    role: respAcc.data[0].role,
                                    status: 2,
                                    idTable: respAcc.data[0].idTable,
                                    id: respAcc.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                  const url =
                                    "http://localhost:3000/api/managers/" +
                                    manager.id +
                                    "/replace";
                                  axios.post(url, manager);
                                  setTimeout(() => {
                                    this.$router.push("/managers");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            });
                        } else if (respPos.data[0].positionType == "Quản lý") {
                          axios
                            .get(
                              "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                "Quản lý"
                            )
                            .then((respRole) => {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][role]=" +
                                    respRole.data[0].id
                                )
                                .then((respAcc) => {
                                  const account = {
                                    userId: respAcc.data[0].userId,
                                    username: respAcc.data[0].username,
                                    password: respAcc.data[0].password,
                                    role: respAcc.data[0].role,
                                    status: 2,
                                    idTable: respAcc.data[0].idTable,
                                    id: respAcc.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                  const url =
                                    "http://localhost:3000/api/managers/" +
                                    manager.id +
                                    "/replace";
                                  axios.post(url, manager);
                                  setTimeout(() => {
                                    this.$router.push("/managers");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            });
                        } else if (respPos.data[0].positionType == "Giám học") {
                          axios
                            .get(
                              "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                "Giám học"
                            )
                            .then((respRole) => {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][role]=" +
                                    respRole.data[0].id
                                )
                                .then((respAcc) => {
                                  const account = {
                                    userId: respAcc.data[0].userId,
                                    username: respAcc.data[0].username,
                                    password: respAcc.data[0].password,
                                    role: respAcc.data[0].role,
                                    status: 2,
                                    idTable: respAcc.data[0].idTable,
                                    id: respAcc.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                  const url =
                                    "http://localhost:3000/api/managers/" +
                                    manager.id +
                                    "/replace";
                                  axios.post(url, manager);
                                  setTimeout(() => {
                                    this.$router.push("/managers");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            });
                        }
                      });
                  });
              } else {
                const url =
                  "http://localhost:3000/api/managers/" +
                  manager.id +
                  "/replace";
                axios.post(url, manager);
                setTimeout(() => {
                  this.$router.push("/managers");
                  location.reload();
                }, 100);
                return 0;
              }
            }
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
            if (this.selectedFile != null) {
              const fd = new FormData();
              fd.append("image", this.selectedFile, this.selectedFile.name);
              var start = this.selectedFile.name.lastIndexOf(".");
              var end = this.selectedFile.length;
              var fileName =
                this.managerId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                if (manager.status == 2) {
                  axios
                    .get(
                      "http://localhost:3000/api/managers?filter[where][id]=" +
                        this.$route.params.id
                    )
                    .then((respMan) => {
                      axios
                        .get(
                          "http://localhost:3000/api/departments?filter[where][id]=" +
                            respMan.data[0].position
                        )
                        .then((respPos) => {
                          if (respPos.data[0].positionType == "Giám đốc") {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám đốc"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Quản lý"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Quản lý"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Giám học"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám học"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          }
                        });
                    });
                } else {
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  axios
                    .delete(
                      "http://localhost:3000/api/Photos/manager/files/" +
                        this.imageEdit
                    )
                    .then((resp) => {
                      console.log(resp);
                    })
                    .catch((err) => console.log(err));
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/manager/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                  setTimeout(() => {
                    this.$router.push("/managers");
                    location.reload();
                  }, 100);
                  return 0;
                }
              } else {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                if (manager.status == 2) {
                  axios
                    .get(
                      "http://localhost:3000/api/managers?filter[where][id]=" +
                        this.$route.params.id
                    )
                    .then((respMan) => {
                      axios
                        .get(
                          "http://localhost:3000/api/departments?filter[where][id]=" +
                            respMan.data[0].position
                        )
                        .then((respPos) => {
                          if (respPos.data[0].positionType == "Giám đốc") {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám đốc"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Quản lý"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Quản lý"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/manager/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          } else if (
                            respPos.data[0].positionType == "Giám học"
                          ) {
                            axios
                              .get(
                                "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                  "Giám học"
                              )
                              .then((respRole) => {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][role]=" +
                                      respRole.data[0].id
                                  )
                                  .then((respAcc) => {
                                    const account = {
                                      userId: respAcc.data[0].userId,
                                      username: respAcc.data[0].username,
                                      password: respAcc.data[0].password,
                                      role: respAcc.data[0].role,
                                      status: 2,
                                      idTable: respAcc.data[0].idTable,
                                      id: respAcc.data[0].id,
                                    };
                                    const url_5 =
                                      "http://localhost:3000/api/accounts/" +
                                      account.id +
                                      "/replace";
                                    axios.post(url_5, account);
                                    const url =
                                      "http://localhost:3000/api/managers/" +
                                      manager.id +
                                      "/replace";
                                    axios.post(url, manager);
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/managers");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              });
                          }
                        });
                    });
                } else {
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/manager/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                  setTimeout(() => {
                    this.$router.push("/managers");
                    location.reload();
                  }, 100);
                  return 0;
                }
              }
            } else {
              const manager = {
                managerId: this.managerId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                image: this.imageEdit,
                position: this.position,
                homeland: this.homeland,
                status: this.status,
                id: this.$route.params.id,
              };
              if (manager.status == 2) {
                axios
                  .get(
                    "http://localhost:3000/api/managers?filter[where][id]=" +
                      this.$route.params.id
                  )
                  .then((respMan) => {
                    axios
                      .get(
                        "http://localhost:3000/api/departments?filter[where][id]=" +
                          respMan.data[0].position
                      )
                      .then((respPos) => {
                        if (respPos.data[0].positionType == "Giám đốc") {
                          axios
                            .get(
                              "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                "Giám đốc"
                            )
                            .then((respRole) => {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][role]=" +
                                    respRole.data[0].id
                                )
                                .then((respAcc) => {
                                  const account = {
                                    userId: respAcc.data[0].userId,
                                    username: respAcc.data[0].username,
                                    password: respAcc.data[0].password,
                                    role: respAcc.data[0].role,
                                    status: 2,
                                    idTable: respAcc.data[0].idTable,
                                    id: respAcc.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                  const url =
                                    "http://localhost:3000/api/managers/" +
                                    manager.id +
                                    "/replace";
                                  axios.post(url, manager);
                                  setTimeout(() => {
                                    this.$router.push("/managers");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            });
                        } else if (respPos.data[0].positionType == "Quản lý") {
                          axios
                            .get(
                              "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                "Quản lý"
                            )
                            .then((respRole) => {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][role]=" +
                                    respRole.data[0].id
                                )
                                .then((respAcc) => {
                                  const account = {
                                    userId: respAcc.data[0].userId,
                                    username: respAcc.data[0].username,
                                    password: respAcc.data[0].password,
                                    role: respAcc.data[0].role,
                                    status: 2,
                                    idTable: respAcc.data[0].idTable,
                                    id: respAcc.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                  const url =
                                    "http://localhost:3000/api/managers/" +
                                    manager.id +
                                    "/replace";
                                  axios.post(url, manager);
                                  setTimeout(() => {
                                    this.$router.push("/managers");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            });
                        } else if (respPos.data[0].positionType == "Giám học") {
                          axios
                            .get(
                              "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                "Giám học"
                            )
                            .then((respRole) => {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][role]=" +
                                    respRole.data[0].id
                                )
                                .then((respAcc) => {
                                  const account = {
                                    userId: respAcc.data[0].userId,
                                    username: respAcc.data[0].username,
                                    password: respAcc.data[0].password,
                                    role: respAcc.data[0].role,
                                    status: 2,
                                    idTable: respAcc.data[0].idTable,
                                    id: respAcc.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                  const url =
                                    "http://localhost:3000/api/managers/" +
                                    manager.id +
                                    "/replace";
                                  axios.post(url, manager);
                                  setTimeout(() => {
                                    this.$router.push("/managers");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            });
                        }
                      });
                  });
              } else {
                const url =
                  "http://localhost:3000/api/managers/" +
                  manager.id +
                  "/replace";
                axios.post(url, manager);
                setTimeout(() => {
                  this.$router.push("/managers");
                  location.reload();
                }, 100);
                return 0;
              }
            }
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
                  if (this.selectedFile != null) {
                    const fd = new FormData();
                    fd.append("image", this.selectedFile, this.selectedFile.name);
                    var start = this.selectedFile.name.lastIndexOf(".");
                    var end = this.selectedFile.length;
                    var fileName =
                      this.managerId + this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const manager = {
                        managerId: this.managerId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        position: this.position,
                        homeland: this.homeland,
                        status: this.status,
                        id: this.$route.params.id,
                      };
                      if (manager.status == 2) {
                        axios
                          .get(
                            "http://localhost:3000/api/managers?filter[where][id]=" +
                              this.$route.params.id
                          )
                          .then((respMan) => {
                            axios
                              .get(
                                "http://localhost:3000/api/departments?filter[where][id]=" +
                                  respMan.data[0].position
                              )
                              .then((respPos) => {
                                if (respPos.data[0].positionType == "Giám đốc") {
                                  axios
                                    .get(
                                      "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                        "Giám đốc"
                                    )
                                    .then((respRole) => {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][role]=" +
                                            respRole.data[0].id
                                        )
                                        .then((respAcc) => {
                                          const account = {
                                            userId: respAcc.data[0].userId,
                                            username: respAcc.data[0].username,
                                            password: respAcc.data[0].password,
                                            role: respAcc.data[0].role,
                                            status: 2,
                                            idTable: respAcc.data[0].idTable,
                                            id: respAcc.data[0].id,
                                          };
                                          const url_5 =
                                            "http://localhost:3000/api/accounts/" +
                                            account.id +
                                            "/replace";
                                          axios.post(url_5, account);
                                          const url =
                                            "http://localhost:3000/api/managers/" +
                                            manager.id +
                                            "/replace";
                                          axios.post(url, manager);
                                          axios
                                            .delete(
                                              "http://localhost:3000/api/Photos/manager/files/" +
                                                this.imageEdit
                                            )
                                            .then((resp) => {
                                              console.log(resp);
                                            })
                                            .catch((err) => console.log(err));
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/managers");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    });
                                } else if (
                                  respPos.data[0].positionType == "Quản lý"
                                ) {
                                  axios
                                    .get(
                                      "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                        "Quản lý"
                                    )
                                    .then((respRole) => {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][role]=" +
                                            respRole.data[0].id
                                        )
                                        .then((respAcc) => {
                                          const account = {
                                            userId: respAcc.data[0].userId,
                                            username: respAcc.data[0].username,
                                            password: respAcc.data[0].password,
                                            role: respAcc.data[0].role,
                                            status: 2,
                                            idTable: respAcc.data[0].idTable,
                                            id: respAcc.data[0].id,
                                          };
                                          const url_5 =
                                            "http://localhost:3000/api/accounts/" +
                                            account.id +
                                            "/replace";
                                          axios.post(url_5, account);
                                          const url =
                                            "http://localhost:3000/api/managers/" +
                                            manager.id +
                                            "/replace";
                                          axios.post(url, manager);
                                          axios
                                            .delete(
                                              "http://localhost:3000/api/Photos/manager/files/" +
                                                this.imageEdit
                                            )
                                            .then((resp) => {
                                              console.log(resp);
                                            })
                                            .catch((err) => console.log(err));
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/managers");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    });
                                } else if (
                                  respPos.data[0].positionType == "Giám học"
                                ) {
                                  axios
                                    .get(
                                      "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                        "Giám học"
                                    )
                                    .then((respRole) => {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][role]=" +
                                            respRole.data[0].id
                                        )
                                        .then((respAcc) => {
                                          const account = {
                                            userId: respAcc.data[0].userId,
                                            username: respAcc.data[0].username,
                                            password: respAcc.data[0].password,
                                            role: respAcc.data[0].role,
                                            status: 2,
                                            idTable: respAcc.data[0].idTable,
                                            id: respAcc.data[0].id,
                                          };
                                          const url_5 =
                                            "http://localhost:3000/api/accounts/" +
                                            account.id +
                                            "/replace";
                                          axios.post(url_5, account);
                                          const url =
                                            "http://localhost:3000/api/managers/" +
                                            manager.id +
                                            "/replace";
                                          axios.post(url, manager);
                                          axios
                                            .delete(
                                              "http://localhost:3000/api/Photos/manager/files/" +
                                                this.imageEdit
                                            )
                                            .then((resp) => {
                                              console.log(resp);
                                            })
                                            .catch((err) => console.log(err));
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/managers");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    });
                                }
                              });
                          });
                      } else {
                        const url =
                          "http://localhost:3000/api/managers/" +
                          manager.id +
                          "/replace";
                        axios.post(url, manager);
                        axios
                          .delete(
                            "http://localhost:3000/api/Photos/manager/files/" +
                              this.imageEdit
                          )
                          .then((resp) => {
                            console.log(resp);
                          })
                          .catch((err) => console.log(err));
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/manager/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        setTimeout(() => {
                          this.$router.push("/managers");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    } else {
                      const manager = {
                        managerId: this.managerId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        position: this.position,
                        homeland: this.homeland,
                        status: this.status,
                        id: this.$route.params.id,
                      };
                      if (manager.status == 2) {
                        axios
                          .get(
                            "http://localhost:3000/api/managers?filter[where][id]=" +
                              this.$route.params.id
                          )
                          .then((respMan) => {
                            axios
                              .get(
                                "http://localhost:3000/api/departments?filter[where][id]=" +
                                  respMan.data[0].position
                              )
                              .then((respPos) => {
                                if (respPos.data[0].positionType == "Giám đốc") {
                                  axios
                                    .get(
                                      "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                        "Giám đốc"
                                    )
                                    .then((respRole) => {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][role]=" +
                                            respRole.data[0].id
                                        )
                                        .then((respAcc) => {
                                          const account = {
                                            userId: respAcc.data[0].userId,
                                            username: respAcc.data[0].username,
                                            password: respAcc.data[0].password,
                                            role: respAcc.data[0].role,
                                            status: 2,
                                            idTable: respAcc.data[0].idTable,
                                            id: respAcc.data[0].id,
                                          };
                                          const url_5 =
                                            "http://localhost:3000/api/accounts/" +
                                            account.id +
                                            "/replace";
                                          axios.post(url_5, account);
                                          const url =
                                            "http://localhost:3000/api/managers/" +
                                            manager.id +
                                            "/replace";
                                          axios.post(url, manager);
                                          axios
                                            .delete(
                                              "http://localhost:3000/api/Photos/manager/files/" +
                                                this.imageEdit
                                            )
                                            .then((resp) => {
                                              console.log(resp);
                                            })
                                            .catch((err) => console.log(err));
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/managers");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    });
                                } else if (
                                  respPos.data[0].positionType == "Quản lý"
                                ) {
                                  axios
                                    .get(
                                      "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                        "Quản lý"
                                    )
                                    .then((respRole) => {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][role]=" +
                                            respRole.data[0].id
                                        )
                                        .then((respAcc) => {
                                          const account = {
                                            userId: respAcc.data[0].userId,
                                            username: respAcc.data[0].username,
                                            password: respAcc.data[0].password,
                                            role: respAcc.data[0].role,
                                            status: 2,
                                            idTable: respAcc.data[0].idTable,
                                            id: respAcc.data[0].id,
                                          };
                                          const url_5 =
                                            "http://localhost:3000/api/accounts/" +
                                            account.id +
                                            "/replace";
                                          axios.post(url_5, account);
                                          const url =
                                            "http://localhost:3000/api/managers/" +
                                            manager.id +
                                            "/replace";
                                          axios.post(url, manager);
                                          axios
                                            .delete(
                                              "http://localhost:3000/api/Photos/manager/files/" +
                                                this.imageEdit
                                            )
                                            .then((resp) => {
                                              console.log(resp);
                                            })
                                            .catch((err) => console.log(err));
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/managers");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    });
                                } else if (
                                  respPos.data[0].positionType == "Giám học"
                                ) {
                                  axios
                                    .get(
                                      "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                        "Giám học"
                                    )
                                    .then((respRole) => {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][role]=" +
                                            respRole.data[0].id
                                        )
                                        .then((respAcc) => {
                                          const account = {
                                            userId: respAcc.data[0].userId,
                                            username: respAcc.data[0].username,
                                            password: respAcc.data[0].password,
                                            role: respAcc.data[0].role,
                                            status: 2,
                                            idTable: respAcc.data[0].idTable,
                                            id: respAcc.data[0].id,
                                          };
                                          const url_5 =
                                            "http://localhost:3000/api/accounts/" +
                                            account.id +
                                            "/replace";
                                          axios.post(url_5, account);
                                          const url =
                                            "http://localhost:3000/api/managers/" +
                                            manager.id +
                                            "/replace";
                                          axios.post(url, manager);
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/managers");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    });
                                }
                              });
                          });
                      } else {
                        const url =
                          "http://localhost:3000/api/managers/" +
                          manager.id +
                          "/replace";
                        axios.post(url, manager);
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/manager/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        setTimeout(() => {
                          this.$router.push("/managers");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    }
                  } else {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: this.imageEdit,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    if (manager.status == 2) {
                      axios
                        .get(
                          "http://localhost:3000/api/managers?filter[where][id]=" +
                            this.$route.params.id
                        )
                        .then((respMan) => {
                          axios
                            .get(
                              "http://localhost:3000/api/departments?filter[where][id]=" +
                                respMan.data[0].position
                            )
                            .then((respPos) => {
                              if (respPos.data[0].positionType == "Giám đốc") {
                                axios
                                  .get(
                                    "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                      "Giám đốc"
                                  )
                                  .then((respRole) => {
                                    axios
                                      .get(
                                        "http://localhost:3000/api/accounts?filter[where][role]=" +
                                          respRole.data[0].id
                                      )
                                      .then((respAcc) => {
                                        const account = {
                                          userId: respAcc.data[0].userId,
                                          username: respAcc.data[0].username,
                                          password: respAcc.data[0].password,
                                          role: respAcc.data[0].role,
                                          status: 2,
                                          idTable: respAcc.data[0].idTable,
                                          id: respAcc.data[0].id,
                                        };
                                        const url_5 =
                                          "http://localhost:3000/api/accounts/" +
                                          account.id +
                                          "/replace";
                                        axios.post(url_5, account);
                                        const url =
                                          "http://localhost:3000/api/managers/" +
                                          manager.id +
                                          "/replace";
                                        axios.post(url, manager);
                                        setTimeout(() => {
                                          this.$router.push("/managers");
                                          location.reload();
                                        }, 100);
                                        return 0;
                                      });
                                  });
                              } else if (respPos.data[0].positionType == "Quản lý") {
                                axios
                                  .get(
                                    "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                      "Quản lý"
                                  )
                                  .then((respRole) => {
                                    axios
                                      .get(
                                        "http://localhost:3000/api/accounts?filter[where][role]=" +
                                          respRole.data[0].id
                                      )
                                      .then((respAcc) => {
                                        const account = {
                                          userId: respAcc.data[0].userId,
                                          username: respAcc.data[0].username,
                                          password: respAcc.data[0].password,
                                          role: respAcc.data[0].role,
                                          status: 2,
                                          idTable: respAcc.data[0].idTable,
                                          id: respAcc.data[0].id,
                                        };
                                        const url_5 =
                                          "http://localhost:3000/api/accounts/" +
                                          account.id +
                                          "/replace";
                                        axios.post(url_5, account);
                                        const url =
                                          "http://localhost:3000/api/managers/" +
                                          manager.id +
                                          "/replace";
                                        axios.post(url, manager);
                                        setTimeout(() => {
                                          this.$router.push("/managers");
                                          location.reload();
                                        }, 100);
                                        return 0;
                                      });
                                  });
                              } else if (respPos.data[0].positionType == "Giám học") {
                                axios
                                  .get(
                                    "http://localhost:3000/api/roles?filter[where][roleName]=" +
                                      "Giám học"
                                  )
                                  .then((respRole) => {
                                    axios
                                      .get(
                                        "http://localhost:3000/api/accounts?filter[where][role]=" +
                                          respRole.data[0].id
                                      )
                                      .then((respAcc) => {
                                        const account = {
                                          userId: respAcc.data[0].userId,
                                          username: respAcc.data[0].username,
                                          password: respAcc.data[0].password,
                                          role: respAcc.data[0].role,
                                          status: 2,
                                          idTable: respAcc.data[0].idTable,
                                          id: respAcc.data[0].id,
                                        };
                                        const url_5 =
                                          "http://localhost:3000/api/accounts/" +
                                          account.id +
                                          "/replace";
                                        axios.post(url_5, account);
                                        const url =
                                          "http://localhost:3000/api/managers/" +
                                          manager.id +
                                          "/replace";
                                        axios.post(url, manager);
                                        setTimeout(() => {
                                          this.$router.push("/managers");
                                          location.reload();
                                        }, 100);
                                        return 0;
                                      });
                                  });
                              }
                            });
                        });
                    } else {
                      const url =
                        "http://localhost:3000/api/managers/" +
                        manager.id +
                        "/replace";
                      axios.post(url, manager);
                      setTimeout(() => {
                        this.$router.push("/managers");
                        location.reload();
                      }, 100);
                      return 0;
                    }
                  }
                }
              });
          }
        });
    }
  } else {
    alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
      alertify.success("Ok");
    });
  }
},