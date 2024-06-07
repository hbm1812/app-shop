import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(
    tenSanPham: string,
    moTa: string,
    giaBan: string,
    giaGiam: string,
    hinhAnh: [],
    loaiSanPham: string,
    thuongHieu: string,
    kichThuoc: string,
    mauSac: string,
    soLuong: number,
    trangThai: string,
    ngayTao: Date,
    ngayCapNhat: Date,
    code: string,
    sanPhamMoi: boolean,
    giaNhapHang: string,
  ): Promise<any> {
    const loai = new this.productModel({
      tenSanPham,
      moTa,
      giaBan,
      giaGiam,
      hinhAnh,
      loaiSanPham,
      thuongHieu,
      kichThuoc,
      mauSac,
      soLuong,
      trangThai,
      ngayTao,
      ngayCapNhat,
      code,
      sanPhamMoi,
      giaNhapHang,
    });
    const result = await loai.save();
    const Obj = result.toObject();
    return Obj;
  }

  async update(body, _id): Promise<any> {
    body.ngayCapNhat = new Date();
    const product = await this.productModel.findByIdAndUpdate(_id, body);
    return product;
  }

  async delete(_id): Promise<any> {
    const product = await this.productModel.findByIdAndDelete(_id);
    if (!product) {
      throw new NotFoundException('Product not found');
    } else {
      const delPr = this.productModel.findOne({ _id }).lean().exec();
      if (delPr) {
        return 'Xóa thành công!';
      }
      return 'Xóa thất bại!';
    }
  }

  async search(
    body,
    page: number = 1,
    size: number = 10,
  ): Promise<any> {
    const searchValue: any = { $or: [] };

    if (body.tenSanPham) {
      searchValue.$or.push({ tenSanPham: { $regex: body.tenSanPham, $options: 'i' } });
    }

    if (body.loaiSanPham) {
      searchValue.$or.push({ loaiSanPham: { $regex: body.loaiSanPham }});
    }
    if (body.thuongHieu) {
      searchValue.$or.push({ thuongHieu: { $regex: body.thuongHieu} });
    }

    if (body.kichThuoc) {
      searchValue.$or.push({ kichThuoc: { $regex: body.kichThuoc } });
    }

    if (body.mauSac) {
      searchValue.$or.push({ mauSac: { $regex: body.mauSac } });
    }

    if (body.trangThai) {
      searchValue.$or.push({ trangThai: { $regex: body.trangThai } });
    }

    if (body.sanPhamMoi) {
      searchValue.$or.push({ sanPhamMoi: { $regex: body.sanPhamMoi } });
    }

    if (searchValue.$or.length === 0) {
      delete searchValue.$or;
    }

    const products = await this.productModel
      .find(searchValue)
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    const total = await this.productModel.countDocuments(searchValue).exec();
    return { products, total, page, size };
  }
}
