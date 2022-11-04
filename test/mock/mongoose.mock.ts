function mockModel(dto: any) {
  this.data = dto;
  this.save = () => {
    return this.data;
  };
  this.create = function (dto) {
    return (this.data = dto);
  };
  this.findOneAndUpdate = function () {
    return this;
  };
  this.find = function () {
    return this;
  };
  this.exec = function () {
    return this.data;
  };
}

export { mockModel };
