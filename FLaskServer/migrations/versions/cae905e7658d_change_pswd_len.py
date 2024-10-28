"""Change pswd len

Revision ID: cae905e7658d
Revises: 88ba578870ab
Create Date: 2024-08-29 17:04:29.254785

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'cae905e7658d'
down_revision = '88ba578870ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('faculty', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(length=120),
               type_=sa.String(length=1000),
               existing_nullable=False)

    with op.batch_alter_table('student', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(length=120),
               type_=sa.String(length=1000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('student', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=1000),
               type_=mysql.VARCHAR(length=120),
               existing_nullable=False)

    with op.batch_alter_table('faculty', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=1000),
               type_=mysql.VARCHAR(length=120),
               existing_nullable=False)

    # ### end Alembic commands ###
